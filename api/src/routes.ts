import dayjs from "dayjs";
import { prisma } from "./lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";


export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request, reply) => {
    try {
      const habbitInput = z.object({
        title: z.string().min(1).max(255),
        weekDays: z.array(z.number().min(0).max(6)),
        userId: z.string().uuid(),
      });
      const { title, weekDays, userId } = habbitInput.parse(request.body);
  
      const today = dayjs().startOf("day").toDate();
      const response = await prisma.habit.create({
        data: {
          title,
          created_at: today,
          weekDays: {
            create: weekDays.map((weekDay) => {
              return {
                week_day: weekDay,
                user_id: userId,
              };
            }),
          },
          user: { connect: { id: userId } }
        },
      });
      console.log('Success to create habits/habits response => ', response, ' request: ', request.body);
      reply.code(201);
      return {
        data: {
          id: response.id,
          title: response.title,
        },
      }
    } catch(error) {
      console.log('Error to create habits/habits error => ', error, ' request: ', request.body);
      throw error;
    }
   
  });

  app.get("/habits", async (request, reply) => {
    const routeParams = z.object({
      userId: z.string(),
    });

    const { userId } = routeParams.parse(request.query);
    if(!userId) {
      reply.code(400);
      return {
        message: 'User id is required'
      }
    }
    const habits = await prisma.habit.findMany({
      include: {
        dayHabits: true,
        weekDays: true,
      },
      where: {
        user_id: userId
      }
    });
    return habits;
  });

  app.get("/habits/:id", async (request) => {
    const routeParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = routeParams.parse(request.params);
    const habits = await prisma.habit.findUnique({
      where: {
        id: id
      },
      include: {
        dayHabits: true,
        weekDays: true
      },
    });
    return habits;
  })

  app.patch("/habits/:id/toggle", async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });

    const toggleHabitBodyParams = z.object({
      userId: z.string().uuid(),
    });

    const { id } = toggleHabitParams.parse(request.params);
    const { userId } = toggleHabitBodyParams.parse(request.body);
    
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
          user_id: userId
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
          user_id: userId
        },
      });
    }

    return {
      data: {
        habitId: id,
        daiId: day.id,
        user_id: userId
      },
      message: `Success, Habit ${message} with success`,
      code: message,
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
      userId: z.string().uuid(),
    });

    const { date, userId } = dayParamsInput.parse(request.query);
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
        user_id: userId
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
      }
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
      message: "Success, summar returned",
    };
  });

  app.post("/users", async (request, reply) => {
    try {
      const userInput = z.object({
        uid: z.string().min(1).max(450),
        name: z.string().min(1).max(450),
        email: z.string().min(1).max(450),
        token: z.string().min(1).max(450),
        photoURL: z.string(),
        password: z.string().min(1).max(450),
      });
      const { name, email, token, photoURL } = userInput.parse(request.body);
  
      const response = await prisma.user.create({
        data: {
          name, 
          email, 
          token, 
          photoURL,
          password: token
        },
      });
      console.log('Success to create users response => ', response, ' request: ', request.body);
      reply.code(201);
      return {
        data: {
          id: response.id,
          response
        },
      }
    } catch(error) {
      console.log('Error to create users error => ', error, ' request: ', request.body);
      throw error;
    }
   
  });

  app.get("/users/:id", async (request) => {
    const routeParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = routeParams.parse(request.params);
    const habits = await prisma.user.findUnique({
      where: {
        id: id
      },
      include: {
        habits: true
      },
    });
    return habits;
  })

  app.get("/users/:id/summary", async (request) => {
    const routeParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = routeParams.parse(request.params);
    const summary = await prisma.$queryRaw`
      SELECT 
        day.id,
        day.date,
        (
          SELECT 
            CAST(COUNT(*) AS FLOAT)
          FROM days_habits dayHabit
          WHERE dayHabit.day_id = day.id
          AND dayHabit.user_id = ${id}
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
            AND habit.user_id = ${id}
        ) as amount      
      FROM days day
      WHERE day.user_id = ${id}       
      ORDER BY day.date DESC   
    `;

    return {
      data: summary,
      code: "200",
      message: "Success, summary returned",
    };
  })

  app.get("/users", async (request) => {
    const routeParams = z.object({
      email: z.string().email(),
    });

    const { email } = routeParams.parse(request.query);
    const user = await prisma.user.findUnique({
      where: {
        email: email
      },
      include: {
        habits: true
      },
    });
    return user;
  })
}
