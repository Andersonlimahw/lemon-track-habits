import { View, Text, ScrollView } from 'react-native';
import { Header } from "../../components/Header"
import { DAY_SIZE, HabitDay } from '../../components/HabitDay/index';
import { generateDatesFromYearBeginning } from "../../utils";
import React, { useEffect } from 'react';
import { useLoadHabits } from './hooks';
import { Habit } from '../../models';


const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const days = generateDatesFromYearBeginning();
const mimimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = mimimumSummaryDatesSizes - days.length;


export const Home = () => {
    const { loading, habits } = useLoadHabits();    

    useEffect(() => {
       console.info('[Home]: habits => ', habits, loading);
      }, [habits, loading])

    const habbitsFilled = habits.map((habit : Habit) => {
        const { id, title, created_at, weekDays : habitWeekDays,  } = habit;
        // const dayHasHabits = days.
        //     find((day : Date) => habitWeekDays
        //     .find((x) => x.week_day === day.getDay()));
        
        return {
            id,
            title,
            created_at,
            weekDays: habitWeekDays
        }
    });

    const mappedHabits = [...habbitsFilled, ...days]


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
                            />
                        ))
                    }
                    
                    {
                        !loading && mappedHabits.map((habit : any, index) => (
                            <HabitDay
                                key={index}
                                disabled={!habit.id}
                                handleClick={() => alert(JSON.stringify(habit))}
                            />
                        ))
                    }
                </View>

                <View
                    className="flex-row flex-wrap"
                >
                    {
                        amountOfDaysToFill > 0 &&
                        Array.from({
                            length: amountOfDaysToFill
                        }).map((_, index) => (<HabitDay
                            key={index}
                            disabled
                        />))
                    }
                </View>
            </ScrollView>
        </View>
    )
}