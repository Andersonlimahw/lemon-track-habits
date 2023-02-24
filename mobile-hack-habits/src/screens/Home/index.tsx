import { View, Text, ScrollView } from 'react-native';
import { Header } from "../../components/Header"
import { DAY_SIZE, HabitDay } from '../../components/HabitDay/index';
import { generateDatesFromYearBeginning } from "../../utils";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const days = generateDatesFromYearBeginning();
const mimimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = mimimumSummaryDatesSizes - days.length;

export const Home = () => {
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
                        days.map((date) => (
                            <HabitDay
                                key={date.toISOString()}
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