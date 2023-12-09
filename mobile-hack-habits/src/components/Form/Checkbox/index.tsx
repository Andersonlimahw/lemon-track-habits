import { Pressable, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import colors from "tailwindcss/colors";

type CheckboxProps = {
  onChange: (newValue: boolean) => void;
  checked: boolean;
  label: string
};


export const CheckboxCustom = ({ onChange, checked, label }: CheckboxProps) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <View className='flex-row gap-4 my-2'>
      <TouchableOpacity
        className='flex items-center justify-center w-8 h-8 bg-violet-500  rounded-md'
        onPress={handleToggle}
        role="checkbox"
      >
        {checked ? (
          <Ionicons
            name="checkmark"
            color={colors.white}
            className='text-white dark:text-white text-4xl'
          />
        ) : null}
      </TouchableOpacity>
      <Text className='text-white font-semibold my-2'>{label}</Text>
    </View>

  );
};