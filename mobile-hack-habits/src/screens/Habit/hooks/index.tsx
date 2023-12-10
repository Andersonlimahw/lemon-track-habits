import { fetchApi } from "../../../utils/requests";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../utils/api-config";
import { Habit } from "../../../models";


const fetchHabitById = async (id: string): Promise<Habit> => {
  try {
    const url = `${API_BASE_URL}/habits/${id}`;
    const response = await fetchApi<any>({
      method: 'GET',
      url,
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