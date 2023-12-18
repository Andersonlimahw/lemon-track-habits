import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const firstHabitId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000')

const secondHabitId = '00880d75-a933-4fef-94ab-e05744435297'
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdHabitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000')



const user_id = '0730ffac-d039-4194-9571-01aa2aa0efbd';

const monday: number = 0;
async function run() {

  await prisma.dayHabit.deleteMany();
  await prisma.habitWeekDays.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.day.deleteMany();

  await prisma.user.deleteMany();


  await prisma.user.create({
    data: {
      id: user_id,
      name: 'Lemon.dev',
      email: 'lemon@lemon.dev.br',
      password: '123456',
      token: user_id,
      photoURL: 'https://avatars.githubusercontent.com/u/15092575?s=48&amp;v=4',
    }
  });


  /**
   * Create habits
   */
  await prisma.habit.create({
    data: {
      id: firstHabitId,
      title: 'Beber 2L água',
      created_at: firstHabitCreationDate,
      weekDays: {
        create: [
          { week_day: 1, user_id: user_id },
          { week_day: 2, user_id: user_id },
          { week_day: 3, user_id: user_id },
        ]
      },
      user: { connect: { id: user_id } }
    }
  });

  await prisma.habit.create({
    data: {
      id: secondHabitId,
      title: 'Exercitar',
      created_at: secondHabitCreationDate,
      weekDays: {
        create: [
          { week_day: 3, user_id: user_id },
          { week_day: 4, user_id: user_id },
          { week_day: 5, user_id: user_id },
        ]
      },
      user: { connect: { id: user_id } }
    }
  });

  await prisma.habit.create({
    data: {
      id: thirdHabitId,
      title: 'Dormir 8h',
      created_at: thirdHabitCreationDate,
      weekDays: {
        create: [
          { week_day: 1, user_id: user_id },
          { week_day: 2, user_id: user_id },
          { week_day: 3, user_id: user_id },
          { week_day: 4, user_id: user_id },
          { week_day: 5, user_id: user_id },
        ]
      },
      user: { connect: { id: user_id } }
    }
  });

  /**
     * Habits (Complete/Available): 1/1
     */
  await prisma.day.create({
    data: {
      /** Monday */
      date: new Date('2023-01-02T03:00:00.000z'),
      dayHabits: {
        create: [{
          habit_id: firstHabitId,
          user_id: user_id,
        }]
      },
      user: { connect: { id: user_id } }
    }
  });

  /**
   * Habits (Complete/Available): 1/1
   */
  await prisma.day.create({
    data: {
      /** Friday */
      date: new Date('2023-01-06T03:00:00.000z'),
      dayHabits: {
        create: [
          { habit_id: firstHabitId, user_id: user_id },
        ]
      },
      user: { connect: { id: user_id } } // Add this line to include the user property
    }
  });

  /**
   * Habits (Complete/Available): 2/2
   */
  await prisma.day.create({
    data: {
      /** Wednesday */
      date: new Date('2023-01-04T03:00:00.000z'),
      dayHabits: {
        create: [
          { habit_id: firstHabitId, user_id: user_id },
          { habit_id: secondHabitId, user_id: user_id },
        ]
      },
      user: { connect: { id: user_id } } // Add this line to include the user property
    }
  });
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
