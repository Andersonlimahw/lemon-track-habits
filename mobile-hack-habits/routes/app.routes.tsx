import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../src/screens/Home/index";
import { NewHabit } from "../src/screens/NewHabit/index";
import { Habit } from './../src/screens/Habit/index';
import { View, Text } from "react-native";
import React from "react";

const { Navigator, Screen } = createNativeStackNavigator();


function NavigationTest() {
    return (
        <View className='flex-1 bg-background w-full px-4 p-4 min-w-full' style={{
            flex: 1, 
            backgroundColor: '#000', 
            width: 1000,
            height: 2000, 
            marginTop: 150
        }}>
            <Text className='flex-1 bg-background text-white px-4 text-5xl max-w-5xl'>
                Hack your Habits
            </Text>
            <Text className='flex-1 bg-background text-zinc px-4 text-5xl max-w-5xl'>
                Teste dentro do navigator navigation teste
            </Text>
        </View>

    )
}

const SCREEN_OPTIONS_CONFIG : NativeStackNavigationOptions = {
    animation: "fade", 
    headerShown: false,
    autoHideHomeIndicator: false, 
    contentStyle: {
        backgroundColor: '#000',
        minWidth: 100,
        minHeight: 400
    }, 
    headerBackButtonMenuEnabled: true,
}

export function AppRoutes() {
    return (
        <Navigator
            initialRouteName="home"
            screenOptions={SCREEN_OPTIONS_CONFIG}
        >
            <Screen
                name="home"
                component={Home}
                options={{
                    title: "Habits"
                }}
            />
            <Screen
                name="new"
                component={NewHabit}
            />
            <Screen
                name="habit"
                component={Habit}
            />
        </Navigator>
    )
}