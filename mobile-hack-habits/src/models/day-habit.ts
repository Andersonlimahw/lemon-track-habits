import { Day } from "./day";
import { Habit } from "./habit";

export interface DayHabit {
  id: string,

  day_id: string,
  habit_id: string,

  day: Day,
  habit: Habit
 
}