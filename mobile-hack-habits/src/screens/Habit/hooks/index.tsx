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

interface IToggleHabitRequest {
  userId: string;
  date: Date;
}


interface IToggleHabitResponse {
  code: 'removed' | 'completed';
  data: IToggleHabitData;
  message: string;
}



export const useLoadHabitByDate = (date: Date, userId: string) => {
  const [habitByDate, setHabitByDate] = useState<IDataGetHabitByDateRespose>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDayByDate = async (date: Date, userId: string): Promise<IGetHabitByDateRespose> => {
    try {
      const url = `${API_BASE_URL}/day?date=${date}&userId=${userId}`;
  
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
     
      const url = `${API_BASE_URL}/habits/${habitId}/toggle`;
      const toggleHabitResponse = await fetchApi<IToggleHabitRequest, IToggleHabitResponse>({
        method: 'PATCH',
        url,
        body: {
          userId, 
          date: new Date()
        }
      });

      await handleFetchByDate();

      return toggleHabitResponse;      
    } catch (error) {
      throw error;
    }
  }

  const handleFetchByDate = async () => {
    await fetchDayByDate(date, userId)
    .then((response) => setHabitByDate(response.data))
    .catch(() => setHabitByDate(undefined))
    .finally(() => setLoading(false));    
  }  
   
  useEffect(() => {
    if(!date) return;
    
    (async () => {
      setLoading(true);
      await handleFetchByDate();
    })();
  }, [date, userId]);

  return {
    habitByDate,
    loading,
    fetchToggleHabit
  }
}