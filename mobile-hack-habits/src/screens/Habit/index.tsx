import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLoadHabitById } from './hooks';
import { Habit as HabitModel } from '../../models';
import { CheckboxCustom } from '../../components/Form/Checkbox';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { weekDaysListLabels } from '../../constants/week-days';
export const Habit = () => {
    const route: any = useRoute();
    const { navigate } = useNavigation();
    const id = route.params?.date;
    const defaultId = "0730ffac-d039-4194-9571-01aa2aa0efbd";
    const { habitById, loading } = useLoadHabitById(id || defaultId);

    const BackButton = () => (
        <TouchableOpacity
            activeOpacity={0.7}
            className='flex-row h-12 rounded-lg items-center my-5'
            onPress={() => navigate('home')}
        >
            <Feather
                name="arrow-left"
                color={colors.zinc[500]}
                size={40}
            />            
        </TouchableOpacity>
    );

    const DateTile = () => {
        const date = new Date(habitById?.created_at || new Date());
        const day = date.getDay();
        const month = date.getMonth();

        return (
            <View className='flex-column items-start pt-5 mt-10'>
                <Text className='text-zinc-400 font-bold my-2 mb-1'>
                    {weekDaysListLabels[day]}
                </Text>
                <View className='flex-col ml-2 text-white'>
                    <Text className='text-white text-3xl font-bold my-5 mb-6'>
                        {day}/{month}
                    </Text>
                </View>
            </View>
        )
    }
    

    return (
        <SafeAreaView>
            <View className='px-4 pt-4'>
                {
                    loading || !habitById ? <Text>Carregando...</Text> : null
                }
                <View>
                    <BackButton />

                    {DateTile()}

                    <Text className='text-white text-3xl font-bold my-5 mb-6'>
                        {habitById?.title}
                    </Text>

                </View>
               
                {/* // TODO : update api to return resolved values on children */}

                <View className='flex my-4'>
                    <Text className='text-white font-bold my-2'>Hábitos:</Text>
                    {!loading && habitById && habitById.dayHabits.map((weekDay) => (
                        <View
                            key={weekDay.id}
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
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
        </SafeAreaView>

    )
}