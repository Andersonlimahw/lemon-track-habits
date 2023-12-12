import { View, Text, ScrollView } from 'react-native';
import { Header } from "../../components/Header"
import { DAY_SIZE, HabitDay } from '../../components/HabitDay/index';
import { generateDatesFromYearBeginning } from "../../utils";
import React from 'react';
import { useLoadHabits } from './hooks';
import { Summary } from '../../models/summary';
import { useNavigation } from '@react-navigation/native';


const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const days = generateDatesFromYearBeginning();
const mimimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = (habitsLength : number) => mimimumSummaryDatesSizes - habitsLength;


export const Home = () => {
    const navigation = useNavigation();
    const { loading, habits } = useLoadHabits();    
    const habbitsFilled = habits.map((summary : Summary) => {      
        return {
            ...summary,
            percentual: (summary.completed / summary.amount) * 100,
        }
    });

    const mappedHabits = [...habbitsFilled ];

    const handleNavigation = (date : string) => {
        navigation.navigate('habit', { date: date })
    }
    return (
        <View className="bg-background flex-1 px-6 pt-16">
            <Header />
            <View
                className="flex-row mt-6 mb-6"
            >
                {
                    weekDays.map((day, index) => (
                        <Text
                            key={index}
                            className="text-zinc-400 text-xl font-semi-bold text-center mx-1"
                            style={{
                                width: DAY_SIZE
                            }}
                        >
                            {day}
                        </Text>
                    ))
                }
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
                        loading && days.map((habit) => (
                            <HabitDay
                                key={habit.toLocaleDateString()}
                                disabled
                                percentual={0}
                            />
                        ))
                    }
                    
                    {
                        !loading && mappedHabits.map((habit : any, index) => (
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
                        amountOfDaysToFill(habbitsFilled.length) > 0 &&
                        Array.from({
                            length: amountOfDaysToFill(habbitsFilled.length)
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