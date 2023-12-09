import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/images/logo.svg';
import React from 'react';

export const Header = () => {

    const { navigate } = useNavigation();

    const NewHabitButton = () => (
        <TouchableOpacity
            activeOpacity={0.7}
            className='flex-row h-12 px-4 border-violet-500 border rounded-lg items-center'
            onPress={() => navigate('new')}
        >
            <Feather
                name="plus"
                color={colors.violet[500]}
                size={20}
            />
            <Text className='text-white ml-3 font-semibold text-base'>
                Novo
            </Text>
        </TouchableOpacity>
    );

    return (
        <View className='w-full flex-row items-center justify-between mt-8 mb-4'>
            <Logo />
            <NewHabitButton />
        </View>
    )
}