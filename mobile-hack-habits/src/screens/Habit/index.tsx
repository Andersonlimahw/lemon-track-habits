import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLoadHabitByDate } from './hooks';
import { Habit as HabitModel } from '../../models';
import { CheckboxCustom } from '../../components/Form/Checkbox';
import { ProgressBar } from '../../components/Progressbar';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { DateTitle } from '../../components/DateTitle';

export const Habit = () => {
    const route: any = useRoute();
    const { navigate } = useNavigation();
    const date = route.params?.date;
    const { habitByDate, loading , fetchToggleHabit } = useLoadHabitByDate(date);

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

    const returnProgress = () => {
        if (habitByDate) {
            const { completedHabits, possibleHabits } = habitByDate;
            const totalHabits = possibleHabits.length;
            const totalCompletedHabits = completedHabits.length;
            const progress = (totalCompletedHabits / totalHabits) * 100;
            return progress;
        }
        return 0;
    }

    return (
        <SafeAreaView>
            <View className='px-4 pt-4'>
                {/* TODO : Empty screen */}
                {
                    loading || !habitByDate ? <Text>Carregando...</Text> : null
                }
                <View>
                    <BackButton />
                    <DateTitle date={date} />
                    <ProgressBar progressPercentage={returnProgress()} />
                </View>
               
                <View className='flex my-4'>
                    {!loading && habitByDate && habitByDate.possibleHabits.map((habit) => (
                        <View
                            key={habit.id}
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <CheckboxCustom
                                key={habit.id}
                                checked={habitByDate.completedHabits.includes(habit.id)}
                                label={habit?.title}
                                onChange={() => fetchToggleHabit(habit.id)}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    )
}