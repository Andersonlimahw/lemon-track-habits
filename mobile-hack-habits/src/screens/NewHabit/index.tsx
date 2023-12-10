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
            className='flex-row h-12 rounded-lg items-center my-5'
            onPress={() => navigate('home')}
        >
            <Feather
                name="arrow-left"
                color={colors.zinc[500]}
                size={40}
            />            
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