import { DayHabit , HabitWeekDays } from "./"


export interface Habit {
  id: string,
  title: string
  created_at: Date,
  dayHabits:  DayHabit[]
  weekDays:   HabitWeekDays[]
}