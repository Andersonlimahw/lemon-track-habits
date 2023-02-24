import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './app.routes';

export function Routes() {
    return (
        <View className='flex-1 bg-background'>
            <Text className='flex-1 bg-background text-white px-4'>
                Hack your gabits
            </Text>
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </View>
    )
}

export default Routes;