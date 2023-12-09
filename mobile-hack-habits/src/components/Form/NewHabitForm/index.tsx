import React, { useEffect, useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { CheckboxCustom } from '../Checkbox';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { fetchApi as fetchApi } from '../../../utils/requests';
import { useToast } from 'react-native-toast-notifications';
import {
    load
} from '../../../../node_modules/@react-native-community/cli/node_modules/js-yaml/dist/js-yaml';


interface NewHabitInput {
  title: string;
  weekDays: number[];
}

const NewHabitForm = () => {
  const toast = useToast();

  const [title, setTitle] = useState<string>('');
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  const weekDaysList: number[] = [0, 1, 2, 3, 4, 5, 6];
  const weekDaysListLabels: any = {
    0: 'Domingo', 
    1: 'Segunda',
    2: 'Terça',
    3: 'Quarta',
    4: 'Quinta',
    5: 'Sexta',
    6: 'Sábado'    
  };

  
  useEffect(() => {
    if(loading) {
      toast.show("Carregando...", {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
   
  }, [loading]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_API_URL}/habits}`;
      const body: NewHabitInput = {
        title,
        weekDays,
      };

      await fetchApi<NewHabitInput>({
        method: 'POST',
        url: 'https://locahost:443/habits',
        headers: {},
        body,
      });

      toast.show("Hábito criado com sucesso!", {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      });
    } catch (error) {
      toast.show("Erro, tente novamente mais tarde.", {
        type: 'error',
        placement: 'top',
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
      <TextInput
        value={title}
        onChangeText={setTitle}
        className='flex-row h-12 px-4 border-violet-500 border rounded-lg items-center text-white font-semibold my-4'
        placeholder="Nome do hábito"
      />

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
            className='flex-row h-12 px-4 border-violet-500 border rounded-lg items-center '
            onPress={handleSubmit}
            disabled={loading}
        >
            <Feather
                name="save"
                color={colors.violet[500]}
                size={20}
            />
            <Text className='text-white ml-3 font-semibold text-2xl text-center'>
                Salvar
            </Text>
        </TouchableOpacity>
    </View>
  );
};

export default NewHabitForm;