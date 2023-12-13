import { fetchApi } from "../../../utils/fetch-api";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../utils/api-config";
import { Habit } from "../../../models";

export interface IDataGetHabitByDateRespose {
  possibleHabits: Habit[],
  completedHabits: string[]
}
export interface IGetHabitByDateRespose {
  data: IDataGetHabitByDateRespose,
  message: string
  code: string
}


interface IToggleHabitData {
  daiId: string;
  habitId: string;
}

interface IToggleHabitResponse {
  code: 'removed' | 'completed';
  data: IToggleHabitData;
  message: string;
}


export const useLoadHabitByDate = (date: Date) => {
  const [habitByDate, setHabitByDate] = useState<IDataGetHabitByDateRespose>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDayByDate = async (date: Date): Promise<IGetHabitByDateRespose> => {
    try {
      const url = `${API_BASE_URL}/day?date=${date}`;
  
      const response = await fetchApi<any, IGetHabitByDateRespose>({
        method: 'GET',
        url
      });
      return response as IGetHabitByDateRespose;
    } catch (error) {
      throw error;
    }
  };
  
  const fetchToggleHabit = async (habitId: string): Promise<IToggleHabitResponse> => {
    try {
      setLoading(true);
      const url = `${API_BASE_URL}/habits/${habitId}/toggle`;
      const toggleHabitResponse = await fetchApi<any, IToggleHabitResponse>({
        method: 'PATCH',
        url,
        body: {}
      });
      return toggleHabitResponse;      
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }
  
   
  useEffect(() => {
    if(!date) return;
    
    (async () => {
      setLoading(true);
      await fetchDayByDate(date)
        .then((response) => setHabitByDate(response.data))
        .catch(() => setHabitByDate(undefined))
        .finally(() => setLoading(false));
    })();
  }, [date]);

  return {
    habitByDate,
    loading,
    fetchToggleHabit
  }
}