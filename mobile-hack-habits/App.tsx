
import { StatusBar, View } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications'
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_600SemiBold, 
  Inter_700Bold, 
  Inter_800ExtraBold
} from './node_modules/@expo-google-fonts/inter';

// Local imports:
import { Loading } from './src/components'
import { Routes } from './routes/index';
import React from 'react';

export default function App() {

  const [fonstLoaded] = useFonts({
    Inter_400Regular, 
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_800ExtraBold
  });

  if(!fonstLoaded) {
    return <Loading />;
  }

  return (
    <ToastProvider>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </ToastProvider>
  );
}