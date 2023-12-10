import { TouchableOpacity, View, Text } from "react-native";
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
    <View className='flex-row gap-4 my-0 align-baseline'>
      <TouchableOpacity
        className='flex items-center justify-center w-8 h-8 bg-green-500  rounded-md'
        onPress={handleToggle}
        activeOpacity={0.8}
        role="checkbox"
      >
        {checked ? (
          <Ionicons
            name="checkmark"
            color={colors.white}
            size={24}
            className='text-white font-bold dark:text-white text-4xl'
          />
        ) : null}
       
      </TouchableOpacity>
      <Text className='text-white font-semibold my-1 py-1'>{label}</Text>
    </View>

  );
};