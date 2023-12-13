import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps { 
  page: any
}

export const BackButton = ({ page } : BackButtonProps) => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row h-12 rounded-lg items-center my-5'
      onPress={() => navigate(page)}
    >
      <Feather
        name="arrow-left"
        color={colors.zinc[500]}
        size={40}
      />
    </TouchableOpacity>
  );  
}
