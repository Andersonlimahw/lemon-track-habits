import { fetchApi } from "../../../utils/requests";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../utils/api-config";
import { Summary } from "../../../models/summary";

interface GetSummaryResponse { 
  data: Summary[];  
}

const fetchHabits = async (): Promise<GetSummaryResponse> => {
  try {
    const url = `${API_BASE_URL}/summary`;
    const response = await fetchApi<any>({
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
        .then((response) => {
          setHabits(response.data);
          console.info('[useLoadHabits]: fetchHabits success, response => ', response);
        }).catch((error) => {         
          console.error('[useLoadHabits]: fetchHabits error => ', error);
          setHabits([]);
        })
        .finally(() => setLoading(false));
    })();
  }, []);

  return {
    habits,
    loading
  }
}