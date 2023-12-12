import React from "react";
import { View } from "react-native";

interface IProgressBarProps {
    progressPercentage: number
}
export const ProgressBar = ({ progressPercentage } : IProgressBarProps) => {
  return (
      <View className='h-4 w-full bg-gray-300'>
          <View
              style={{ width: `${progressPercentage}%`}}
              className={`h-full ${
                  progressPercentage < 60 ? 'bg-green-300' : 'bg-green-600'}`}>
          </View>
      </View>
  );
};