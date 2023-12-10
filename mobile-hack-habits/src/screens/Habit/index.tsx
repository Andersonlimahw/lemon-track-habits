import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useLoadHabitById } from './hooks';
export const Habit = () => {
    const route : any = useRoute();
    const id = route.params?.date;
    const defaultId = "0730ffac-d039-4194-9571-01aa2aa0efbd";
    const { habitById, loading } = useLoadHabitById(defaultId);
    return(
        <>
            <View className='flex-1 h-2 bg-zinc-900 px-8 py-8'>
                <Text className='text-white text-2xl font-semibold'>
                    Hábitos
                </Text>
            </View>
            {
                loading ? (
                    <View className='flex-1 h-10 bg-violet-500 px-8 pt-16'>
                        <Text className='text-white text-2xl font-semibold'>
                            Carregando...
                        </Text>
                    </View>
                ) : (
                    <View className='flex-1 h-10 bg-violet-500 px-8 pt-16'>
                        <Text className='text-white text-2xl font-semibold'>
                            {habitById?.title}
                        </Text>
                    </View>
                )
            }
        </>
        
    )
}