import React, { useMemo, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useLoadHabitByDate } from './hooks';
import { CheckboxCustom } from '../../components/Form/Checkbox';
import { ProgressBar } from '../../components/Progressbar';

import { DateTitle } from '../../components/DateTitle';
import { useToast } from 'react-native-toast-notifications';
import { BackButton } from '../../components/BackButton';
import { EmptyHabit } from './components/Empty';
import { useAuth } from '../../hooks/Auth';
import { Loading } from '../../components';

export const Habit = () => {
    const route: any = useRoute();
    const toast = useToast();
    const { userId } = useAuth();
    const date = route.params?.date;
    const { habitByDate, loading, fetchToggleHabit } = useLoadHabitByDate(date, userId);
    const [
        completedHabitsUpdated,
        setCompletedHabitsUpdated
    ] = useState<string[]>(habitByDate?.completedHabits as string[] | []);


    const returnProgressMemo = useMemo(() => {
        if (habitByDate) {
            const { possibleHabits } = habitByDate;
            const totalHabits = possibleHabits.length;
            const totalCompletedHabits = completedHabitsUpdated?.length || 0;
            const progress = (totalCompletedHabits / totalHabits) * 100;
            return progress;
        }
        return 0;
    }, [habitByDate, completedHabitsUpdated]);

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

    const shoulRenderEmptyMemo = useMemo(() => {
        return (!loading  && !habitByDate);
    }, [loading, habitByDate, userId])

    return (
        <SafeAreaView>
            <View className='px-4 pt-4'>
                {
                    loading && <Loading />
                }
                {
                    shoulRenderEmptyMemo && <EmptyHabit date={date} />
                }
                {
                    !loading && habitByDate && (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: 100
                            }}
                        >
                            <View>
                                <BackButton page='home' />
                                <DateTitle date={date} />
                                <ProgressBar progressPercentage={returnProgressMemo} />
                            </View>
                            <View className='flex my-4'>
                                {habitByDate?.possibleHabits.map((habit) => (
                                    <View
                                        key={habit.id}
                                        className='flex-row align-center'
                                        // style={{ flexDirection: 'row', alignItems: 'center' }}
                                    >
                                        <CheckboxCustom
                                            key={habit.id}
                                            checked={completedHabitsUpdated?.includes(habit.id)}
                                            label={habit?.title}
                                            onChange={() => handleToggleHabit(habit.id)} />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    )
                }

            </View>
        </SafeAreaView>
    )
}