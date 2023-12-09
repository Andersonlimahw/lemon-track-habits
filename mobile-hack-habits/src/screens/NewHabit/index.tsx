import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import NewHabitForm from '../../components/Form/NewHabitForm';

export const NewHabit = () => {
    const { navigate } = useNavigation();

    const BackButton = () => (
        <TouchableOpacity
            activeOpacity={0.7}
            className='flex-row h-12 px-4 rounded-lg items-center my-4'
            onPress={() => navigate('home')}
        >
            <Feather
                name="arrow-left-circle"
                color={colors.violet[500]}
                size={20}
            />
            <Text className='text-white ml-3 font-semibold text-base'>
                Voltar
            </Text>
        </TouchableOpacity>
    );
    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100, 
                    paddingTop: 20
                }}
            >
                <BackButton />
                <NewHabitForm />
            </ScrollView>
        </View>
    )
}