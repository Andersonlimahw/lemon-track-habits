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

const fetchDayByDate = async (date: Date): Promise<IGetHabitByDateRespose> => {
  try {
    const url = `${API_BASE_URL}/day?date=${date}`;

    const response = await fetchApi<any>({
      method: 'GET',
      url
    });
    return response as IGetHabitByDateRespose;
  } catch (error) {
    throw error;
  }
};

export const useLoadHabitByDate = (date: Date) => {
  const [habitByDate, setHabitByDate] = useState<IDataGetHabitByDateRespose>();
  const [loading, setLoading] = useState<boolean>(false);
  // TODO : Change to react-use-query
 
  useEffect(() => {
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
    loading
  }
}