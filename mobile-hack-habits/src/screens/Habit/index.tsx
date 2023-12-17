import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLoadHabitByDate } from './hooks';
import { CheckboxCustom } from '../../components/Form/Checkbox';
import { ProgressBar } from '../../components/Progressbar';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { DateTitle } from '../../components/DateTitle';
import { useToast } from 'react-native-toast-notifications';
import { BackButton } from '../../components/BackButton';
import { EmptyHabit } from './components/Empty';
import { AuthContext } from '../../context/AuthContext';

export const Habit = () => {
    const route: any = useRoute();
    const toast = useToast();
    const { userId } = useContext(AuthContext);
    const date = route.params?.date;
    const { habitByDate, loading, fetchToggleHabit } = useLoadHabitByDate(date, userId);
    const [
        completedHabitsUpdated,
        setCompletedHabitsUpdated
    ] = useState<string[]>(habitByDate?.completedHabits as string[] | []);


    const returnProgress = () => {
        if (habitByDate) {
            const { possibleHabits } = habitByDate;
            const totalHabits = possibleHabits.length;
            const totalCompletedHabits = completedHabitsUpdated?.length || 0;
            const progress = (totalCompletedHabits / totalHabits) * 100;
            return progress;
        }
        return 0;
    }

    const handleToggleHabit = async (habitId: string) => {
        await fetchToggleHabit(habitId).then((response) => {
            toast.show("Hábito atualizado", {
                type: 'success',
                placement: 'bottom',
                duration: 1000,
                animationType: 'zoom-in',
            });
            if (response.code === 'removed') {
                return setCompletedHabitsUpdated((prevState: any[]) => {
                    if (!prevState) return [];
                    return [...prevState?.filter((habit) => habit !== habitId)]
                })
            }
            return setCompletedHabitsUpdated((prevState: any[]) => {
                if (!prevState) return [habitId];
                return [...prevState, habitId]
            })

        }).catch(() => {
            toast.show("Erro ao atualizar hábito", {
                type: 'error',
                placement: 'bottom',
                duration: 1000,
                animationType: 'slide-in',
            });
        });

    }

    return (
        <SafeAreaView>
            <View className='px-4 pt-4'>
                {/* TODO : Empty screen */}
                {
                    loading && <Text>Carregando...</Text>
                }
                {
                    (!loading && !habitByDate) || (habitByDate?.possibleHabits.length === 0) && <EmptyHabit date={date} />
                }
                {
                    !loading && habitByDate && habitByDate.possibleHabits.length > 0 && (
                        <>
                            <View>
                                <BackButton page='home' />
                                <DateTitle date={date} />
                                <ProgressBar progressPercentage={returnProgress()} />
                            </View><View className='flex my-4'>
                                {!loading && habitByDate && habitByDate.possibleHabits.map((habit) => (
                                    <View
                                        key={habit.id}
                                        style={{ flexDirection: 'row', alignItems: 'center' }}
                                    >
                                        <CheckboxCustom
                                            key={habit.id}
                                            checked={completedHabitsUpdated?.includes(habit.id)}
                                            label={habit?.title}
                                            onChange={() => handleToggleHabit(habit.id)} />
                                    </View>
                                ))}
                            </View>
                        </>
                    )
                }

            </View>
        </SafeAreaView>
    )
}