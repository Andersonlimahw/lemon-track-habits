import React from "react";
import { View, Text } from "react-native";
import { weekDaysListLabels } from "../../constants/week-days";

interface IDateTitleProps {
    date: string;
}
export const DateTitle = ({ date }: IDateTitleProps) => {
    const now = new Date();
    let dateUtc = new Date(now.toUTCString());
    if(date) {
        dateUtc = new Date(date.toLocaleString());
    }
    
    const day = dateUtc.getUTCDate();
    const weekDayIndex = dateUtc.getUTCDay();
    const month = dateUtc.getUTCMonth() + 1;
    const summaryDay = `${day}/${month}`

    console.log('[DateTitle]: dateParsed', dateUtc, ' date : ', date, ' day : ', day, ' month : ', month);

    return (
        <View className='flex-column items-start pt-5 mt-10'>
            <Text className='text-zinc-400 font-bold my-2 mb-1'>
                {weekDaysListLabels[weekDayIndex]}
            </Text>
            <View className='flex-col ml-2 text-white'>
                <Text className='text-white text-3xl font-bold my-5 mb-6'>
                    {summaryDay}
                </Text>
            </View>
        </View>
    )
}