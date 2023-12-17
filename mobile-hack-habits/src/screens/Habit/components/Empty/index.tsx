import React from "react";
import { View, Text } from "react-native"
import { BackButton } from "../../../../components/BackButton";
import { DateTitle } from "../../../../components/DateTitle";
import { ProgressBar } from "../../../../components/Progressbar";
import { Link } from "@react-navigation/native";


interface IEmptyHabitProps { 
  date: string
}

export const EmptyHabit = ({ date } : IEmptyHabitProps) => {
  return(
    <View>
      <BackButton page='home' />
      <DateTitle date={date} />
      <ProgressBar progressPercentage={0} />
      <Text className="text-zinc-400 my-4 leading-6">
        Você ainda não está monitorando nenhum
        hábito, comece <Link to="/new" >
          <Text className="text-green-400 active:text-green-600 mx-2 p-2">
            cadastrando um.
          </Text>
        </Link>
      </Text>
    </View>
  )
}