import dayjs from "dayjs";
import { prisma } from "./lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const habbitInput = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });
    const { title, weekDays } = habbitInput.parse(request.body);

    const today = dayjs().startOf("day").toDate();
    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });
  });

  app.get("/habits", async () => {
    const habits = await prisma.habit.findMany({
      include: {
        dayHabits: true,
        weekDays: true,
      },
    });
    return habits;
  });

  app.patch("/habits/:id/toggle", async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleHabitParams.parse(request.params);
    const today = dayjs().startOf("day").toDate();
    let message = "completed";

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    // Delete or insert:
    if (dayHabit) {
      // Deleta hábito caso exista.
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
      message = "removed";
    } else {
      // Completa o habito:
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }

    return {
      data: {
        habitId: id,
        daiId: day.id,
      },
      message: `Success, Habit ${message} with success`,
      code: "200",
    };
  });

  app.get("/days", async () => {
    const days = await prisma.day.findMany({
      include: {
        dayHabits: true,
      },
    });
    return days;
  });

  app.get("/day", async (request) => {
    const dayParamsInput = z.object({
      date: z.coerce.date(),
    });

    const { date } = dayParamsInput.parse(request.query);
    const weekDay = dayjs(date).get("day");
    const parsedDate = dayjs(date).startOf("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
      include: {
        dayHabits: true,
        weekDays: true,
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits =
      day?.dayHabits.map((dayHabit) => {
        return dayHabit.habit_id;
      }) ?? [];

    return {
      data: {
        possibleHabits,
        completedHabits,
      },
      message: "Success",
      code: "200",
    };
  });

  // Retorna hábitos possíveis.
  // Retorna quantos hábitos foram completados
  // Query customizada para reduzir chamadas para o banco de dados que o ORM faz.
  // Prisma ORM:
  // RAW : query customizada especifica com o banco selecionado no caso desta aplicação o sqllite.
  app.get("/summary", async () => {
    const summary = await prisma.$queryRaw`
      SELECT 
        day.id,
        day.date,
        (
          SELECT 
            CAST(COUNT(*) AS FLOAT)
          FROM days_habits dayHabit
          WHERE dayHabit.day_id = day.id
        ) as completed,
        (
          SELECT 
            CAST(COUNT(*) AS FLOAT)
          FROM habit_week_days weekDays
          JOIN habits habit
            ON habit.id = weekDays.habit_id
          WHERE
            weekDays.week_day = CAST(strftime('%w',day.date/1000.0,'unixepoch') AS INT)
            AND habit.created_at <= day.date
        ) as amount
      FROM days day
    `;

    return {
      data: summary,
      code: "200",
      message: "Success",
    };
  });
}
