import { prisma } from './lib/prisma';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import dayjs from '../node_modules/dayjs/esm';

export async function appRoutes(app : FastifyInstance) {
    app.get('/habits',  async () => {
        const habits = await prisma.habit.findMany();
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
                }
            }
        })
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
            }
        });
        
        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate(),
            }, 
            include: {
                dayHabits: true
            }
        })

        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        });

        return {
            possibleHabits, 
            completedHabits
        };
    })
}