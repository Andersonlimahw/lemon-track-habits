import { View, Text, ScrollView } from 'react-native';
import { Header } from "../../components/Header"
import { DAY_SIZE, HabitDay } from '../../components/HabitDay/index';
import { generateDatesFromYearBeginning } from "../../utils";
import React from 'react';
import { useLoadHabits } from './hooks';
import { Summary } from '../../models/summary';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/Auth';
import { DateTitle } from '../../components/DateTitle';




const days = generateDatesFromYearBeginning();
const mimimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = (habitsLength: number) => mimimumSummaryDatesSizes - habitsLength;


export const Home = () => {
    const navigation = useNavigation();
    const { userId } = useAuth();
    const { loading, habits } = useLoadHabits(userId);
    const habbitsFilled = habits.map((summary: Summary) => {
        return {
            ...summary,
            percentual: (summary.completed / summary.amount) * 100,
        }
    });

    const mappedHabits = [...habbitsFilled, ...days];

    const handleNavigation = (date: string) => {
        navigation.navigate('habit', { date: date })
    }
    return (
        <View className="bg-background flex-1 px-6 pt-16">
            <Header />
            <View
                className="mb-6"
            >
                <DateTitle date={undefined} />
                <Text className="text-zinc-400 text-xl font-semi-bold text-left mx-1">
                    Acompanhe seus hábitos.
                </Text>
                <Text className="text-zinc-400 text-sm font-semi-bold text-left mx-1">
                    um dia de cada vez
                </Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                <View
                    className="flex-row flex-wrap"
                >
                    {
                        loading && days.map((habit: Date) => (
                            <HabitDay
                                key={habit.toLocaleDateString()}
                                disabled
                                percentual={0}
                            />
                        ))
                    }

                    {
                        !loading && mappedHabits.map((habit: any, index) => (
                            <HabitDay
                                key={index}
                                disabled={!habit.id}
                                handleClick={() => handleNavigation(habit.date)}
                                percentual={habit.percentual}
                            />
                        ))
                    }
                </View>

                <View
                    className="flex-row flex-wrap"
                >
                    {
                        amountOfDaysToFill(days.length) > 0 &&
                        Array.from({
                            length: amountOfDaysToFill(days.length)
                        }).map((_, index) => (
                            <HabitDay
                                key={index}
                                disabled
                                percentual={0}
                            />))
                    }
                </View>
            </ScrollView>
        </View>
    )
}