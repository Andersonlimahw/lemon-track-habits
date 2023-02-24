import { View, ScrollView } from 'react-native';
export const NewHabit = () => {
    return(
        <View className='flex-1 bg-background px-8 pt-16'>            
            <ScrollView showsVerticalScrollIndicator={false} >
             <Text> New Habit </Text>
            </ScrollView>
        </View>
    )
}