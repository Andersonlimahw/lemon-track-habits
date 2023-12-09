import { DayHabit } from './day-habit';
export interface Day {
  id: string,
  date: Date,
  dayHabits: DayHabit[] 
}