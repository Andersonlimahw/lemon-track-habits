import { fetchApi } from "../../../utils/fetch-api";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "../../../utils/api-config";
import { Summary } from "../../../models/summary";
import { useFocusEffect } from "@react-navigation/native";

interface GetSummaryResponse { 
  data: Summary[];  
}

const fetchHabits = async (userId: string): Promise<GetSummaryResponse> => {
  try {
    if(!userId) return  {data: [] } as GetSummaryResponse;
    const url = `${API_BASE_URL}/users/${userId}/summary`;
    const response = await fetchApi<any, GetSummaryResponse>({
      method: 'GET',
      url,
    });
    return response as GetSummaryResponse;
  } catch (error) {
    throw error;
  }
};

export const useLoadHabits = (userId: string) => {
  const [habits, setHabits] = useState<Summary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
 
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchHabits(userId)
        .then((response) => setHabits(response.data))
        .catch(() => setHabits([]))
        .finally(() => setLoading(false));
    })();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await fetchHabits(userId)
        .then((response) => setHabits(response.data))
        .catch(() => setHabits([]))
        .finally(() => setLoading(false));
      };
  
      fetchData();
    }, [userId])
  );

  return {
    habits,
    loading
  }
}