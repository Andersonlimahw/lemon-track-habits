import { fetchApi } from "../../../utils/fetch-api";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "../../../utils/api-config";
import { Summary } from "../../../models/summary";
import { useFocusEffect } from "@react-navigation/native";

interface GetSummaryResponse { 
  data: Summary[];  
}

const fetchHabits = async (): Promise<GetSummaryResponse> => {
  try {
    const url = `${API_BASE_URL}/summary`;
    const response = await fetchApi<any, GetSummaryResponse>({
      method: 'GET',
      url,
    });
    return response as GetSummaryResponse;
  } catch (error) {
    throw error;
  }
};

export const useLoadHabits = () => {
  const [habits, setHabits] = useState<Summary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
 
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchHabits()
        .then((response) => setHabits(response.data))
        .catch(() => setHabits([]))
        .finally(() => setLoading(false));
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await fetchHabits()
        .then((response) => setHabits(response.data))
        .catch(() => setHabits([]))
        .finally(() => setLoading(false));
      };
  
      fetchData();
    }, [])
  );

  return {
    habits,
    loading
  }
}