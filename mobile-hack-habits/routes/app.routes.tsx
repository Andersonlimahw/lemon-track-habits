import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../src/screens/Home/index";
import { NewHabit } from "../src/screens/NewHabit/index";
import { Habit } from './../src/screens/Habit/index';
import React from "react";
const { Navigator, Screen } = createNativeStackNavigator();


const SCREEN_OPTIONS_CONFIG : NativeStackNavigationOptions = {
    animation: "slide_from_left", 
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
                options={{
                    title: "Habit"
                }}
            />
        </Navigator>
    )
}