import { View, ScrollView, Text } from 'react-native';
export const NewHabit = () => {
    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                <Text
                    className='flex-1 text-white'
                >
                    New Habit
                </Text>
            </ScrollView>
        </View>
    )
}