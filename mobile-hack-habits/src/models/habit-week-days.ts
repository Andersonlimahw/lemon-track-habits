import { Habit } from "./habit"

export interface HabitWeekDays {
  id: string,
  habit_id: string,
  week_day: number,
  habit: Habit
}