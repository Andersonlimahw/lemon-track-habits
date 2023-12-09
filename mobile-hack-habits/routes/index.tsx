import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import React from 'react';

export function Routes() {
    return (
        <View 
            className='flex-1 bg-background w-full px-4 p-4 min-w-full'
            style={{ // utilizando flex-1 do tailwindcss a tela fica em branco, manter style inline
                flex: 1
            }}
        >
            <NavigationContainer>               
                <AppRoutes />
            </NavigationContainer>
        </View>
    )
}

export default Routes;