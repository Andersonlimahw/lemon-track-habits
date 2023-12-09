import React, { useState } from 'react';
import { Button, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { CheckboxCustom } from '../Checkbox';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

const NewHabitForm = () => {
  const [title, setTitle] = useState<string>('');
  const [weekDays, setWeekDays] = useState<number[]>([]);


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

  const handleSubmit = () => {
    
    const body = {
      title, 
      weekDays
    }
    // TODO : api request POST baseUrL/habits
    alert(JSON.stringify(body));
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