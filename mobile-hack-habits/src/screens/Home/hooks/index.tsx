import { useToast } from "react-native-toast-notifications";
import { fetchApi } from "../../../utils/requests";
import { useEffect, useState } from "react";
import { Habit } from "../../../models";
import { API_BASE_URL } from "../../../utils/api-config";

const fetchHabits = async (): Promise<Habit[]> => {
  try {
    const url = `${API_BASE_URL}/habits`;
    const response = await fetchApi<any>({
      method: 'GET',
      url,
    });
    return response as Habit[];
  } catch (error) {
    throw error;
  }
};

export const useLoadHabits = () => {
  const toast = useToast();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
 
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchHabits()
        .then((response) => {
          // toast.show("Acompanhe seus hábitos", {
          //   type: 'success',
          //   placement: 'bottom',
          //   duration: 4000,
          //   animationType: 'slide-in',
          // });
          setHabits(response);
          console.info('[useLoadHabits]: fetchHabits success, response => ', response);
        }).catch((error) => {
          // toast.show("Erro, tente novamente mais tarde.", {
          //   type: 'error',
          //   placement: 'bottom',
          //   duration: 4000,
          //   animationType: 'slide-in',
          // });
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