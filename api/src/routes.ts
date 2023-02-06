import dayjs from 'dayjs';
import { prisma } from './lib/prisma';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';


export async function appRoutes(app : FastifyInstance) {
    app.get('/habits',  async () => {
        const habits = await prisma.habit.findMany({
            include: {
                dayHabits: true, 
                weekDays: true
            }
        });
        return habits;
    });

    app.post('/habits', async (request) => {
        const habbitInput = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number()
                .min(0)
                .max(6)
            )
        })
        const { title, weekDays }  = habbitInput.parse(request.body);

        const today = dayjs().startOf('day').toDate();
        await prisma.habit.create({
            data: {
                title, 
                created_at: today, 
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay
                        }
                    })
                }, 
            }
        })
    })

    app.get('/days', async (request) => {
        const days = await prisma.day.findMany({
            include: {
                dayHabits: true,
            }
        });
        return days;
    })

    app.get('/day', async (request) => {
        const dayParamsInput = z.object({
            date: z.coerce.date()
        });

        const { date } = dayParamsInput.parse(request.query);
        const weekDay = dayjs(date).get('day');
        const parsedDate = dayjs(date).startOf('day');

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                }, 
                weekDays: {
                   some: {
                    week_day: weekDay
                   }
                }
            }, 
            include: {
                dayHabits: true,
                weekDays: true,
            }
        });
        
        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate(),
            }, 
            include: {
                dayHabits: true,
            }
        })


        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        }) ?? [];

        return {
            data: {
                possibleHabits, 
                completedHabits
            }, 
            message: "Success", 
            code: "200"
           
        };
    })
}