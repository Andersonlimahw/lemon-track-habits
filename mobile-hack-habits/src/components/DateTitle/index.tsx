import React from "react";
import { View, Text } from "react-native";
import { weekDaysListLabels } from "../../constants/week-days";

interface IDateTitleProps {
    date : string
 }
export const DateTitle = ({ date } : IDateTitleProps) => {
  const dateParsed = new Date();
  const day = dateParsed.getDay();
  const month = dateParsed.getMonth();

  // TODO: Fix bug
  const summaryDay = `${day}/${month}`

  return (
      <View className='flex-column items-start pt-5 mt-10'>
          <Text className='text-zinc-400 font-bold my-2 mb-1'>
              {weekDaysListLabels[day]}
          </Text>
          <View className='flex-col ml-2 text-white'>
              <Text className='text-white text-3xl font-bold my-5 mb-6'>
                  {summaryDay}
              </Text>
          </View>
      </View>
  )
}