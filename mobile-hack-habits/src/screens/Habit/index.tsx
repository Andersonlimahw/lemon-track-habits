import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useLoadHabitById } from './hooks';
import { Habit as HabitModel } from '../../models';
import { CheckboxCustom } from '../../components/Form/Checkbox';
export const Habit = () => {
    const route: any = useRoute();
    const id = route.params?.date;
    const defaultId = "0730ffac-d039-4194-9571-01aa2aa0efbd";
    const { habitById, loading } = useLoadHabitById(id ||defaultId);

    return (
        <View>
            {
                loading || !habitById ? <Text>Carregando...</Text> : null
            }
            <View>
                <Text className='text-white text-3xl font-bold my-5 mb-6'>
                    {habitById?.title}
                </Text>
               
            </View>
            <View>
                <Text className='text-white text-lg'>
                    Quantidade de hábitos
                </Text>
                <Text className='text-white text-3xl font-bold my-5 mb-6'>
                    {habitById?.dayHabits.length}
                </Text>
            </View>

            <View>
                <Text className='text-white text-lg'>
                    Dias da semana
                </Text>
                <Text className='text-white text-3xl font-bold my-5 mb-6'>
                    {habitById?.weekDays.length}
                </Text>
            </View>
            {/* // TODO : update api to return resolved values on children */}

            <View className='flex my-4'>
                <Text className='text-white font-bold my-2'>Hábitos:</Text>
                {!loading && habitById && habitById.weekDays.map((weekDay) => (
                    <View key={weekDay.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CheckboxCustom
                            key={weekDay.id}
                            checked={false}
                            label={weekDay.habit?.title}
                            onChange={() => alert(JSON.stringify(weekDay))}
                        />
                    </View>
                ))}
            </View>
        </View>

    )
}