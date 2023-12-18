import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import colors from 'tailwindcss/colors';

export const Loading = () => (
<View style={{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#09090A',
}}>
    <ActivityIndicator 
        color={colors.green[400]} 
        size="large"
    />

</View>
);