import React, { useContext, useEffect, useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { CheckboxCustom } from '../Checkbox';
import { fetchApi } from '../../../utils/fetch-api';
import { useToast } from 'react-native-toast-notifications';
import { API_BASE_URL } from '../../../utils/api-config';
import { weekDaysList, weekDaysListLabels } from '../../../constants/week-days';
import { AuthContext } from '../../../context/AuthContext';


interface NewHabitInput {
  title: string;
  userId: string;
  weekDays: number[];
}

const NewHabitForm = () => {
  const toast = useToast();
  const { userId } = useContext(AuthContext);
  const [title, setTitle] = useState<string>('');
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  


  useEffect(() => {
    if (loading) {
      toast.show("Carregando...", {
        type: 'info',
        placement: 'bottom',
        duration: 1000,
        animationType: 'slide-in',
      });
    }

  }, [loading]);

  const resetState = () => {
    setTitle('');
    setWeekDays([]);
    setLoading(false);
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/habits`;
      const body: NewHabitInput = {
        title,
        userId,
        weekDays,
      };

      await fetchApi<NewHabitInput, any>({
        method: 'POST',
        url,
        headers: {},
        body,
      });

      toast.show("Hábito criado com sucesso!", {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
      resetState();
    } catch (error) {
      toast.show("Erro, tente novamente mais tarde.", {
        type: 'error',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    } finally {
      setLoading(false);
    }
  };


  const handleWeekDayHabit = (weekDay: number) => {
    if (weekDays.includes(weekDay)) {
      setWeekDays((prevState) => prevState.filter((day) => day !== weekDay));
    } else {
      setWeekDays((prevState) => [...prevState, weekDay]);
    }
  };


  return (
    <View>
      <View>
        <Text className='text-white text-3xl font-bold my-5 mb-6'>
          Criar hábito
        </Text>
      </View>
      <View>
        <Text className='text-white text-lg'>
          Qual seu comprometimento?
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          className='flex-row h-12 px-4 py-2 bg-zinc-900 border-zinc-400 border rounded-lg items-center text-white font-semibold my-4 py-4 placeholder:text-zinc-100'
          placeholder="Exercícios, dormir bem, etc..."
        />
      </View>

      <View className='flex my-4'>
        <Text className='text-white font-bold my-2'>Dias da semana:</Text>
        {weekDaysList.map((weekDay) => (
          <View key={weekDay} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckboxCustom
              key={weekDay}
              checked={weekDays.includes(weekDay)}
              label={weekDaysListLabels[weekDay]}
              onChange={() => handleWeekDayHabit(weekDay)}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        className='flex-row h-12 px-4 border-green-600 border rounded-lg items-center text-center bg-green-500 justify-center my-3'
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text className='text-zinc-900 ml-3 font-semibold text-2xl text-center'>
          Confirmar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewHabitForm;