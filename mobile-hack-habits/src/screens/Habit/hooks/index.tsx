import { fetchApi } from "../../../utils/fetch-api";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../utils/api-config";
import { Habit } from "../../../models";


const fetchHabitById = async (id: string): Promise<Habit> => {
  try {
    // const url = `${API_BASE_URL}/habits/${id}`;
    const response = await fetchApi<any>({
      method: 'GET',
      url: 'https://02fb-179-73-165-213.ngrok-free.app/habits/0730ffac-d039-4194-9571-01aa2aa0efbd'
    });
    return response as Habit;
  } catch (error) {
    throw error;
  }
};

export const useLoadHabitById = (id: string) => {
  const [habitById, setHabitById] = useState<Habit>();
  const [loading, setLoading] = useState<boolean>(false);
  // TODO : Change to react-use-query
 
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchHabitById(id)
        .then((response) => setHabitById(response))
        .catch(() => setHabitById(undefined))
        .finally(() => setLoading(false));
    })();
  }, [id]);

  return {
    habitById,
    loading
  }
}