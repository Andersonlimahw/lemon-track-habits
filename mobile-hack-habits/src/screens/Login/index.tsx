import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { useToast } from 'react-native-toast-notifications';
import { useAuth } from '../../hooks/Auth';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '../../assets/images/logo.svg';

export const LoginScreen = () => {
  const { navigate } = useNavigation();
  const toast = useToast();

  const { login, user, userId, loading } = useAuth();

    const navigateToHome = () =>  {
        navigate('home');
    }
    
    const handleLogin = async () => {
        try {
            await login();
            navigateToHome();
        } catch (ex) {
          toast.show("Erro ao logar", {
            type: 'error',
            placement: 'bottom',
            duration: 1000,
            animationType: 'slide-in',
          });
          console.error('[Error][handleLogin]:', ex);
        }

    }

    useEffect(() => {
        if(user && userId && user.email) {
          toast.show(`Bem-vindo ${user.name}`, {
            type: 'success',
            placement: 'bottom',
            duration: 1000,
            animationType: 'slide-in',
          });       
          navigateToHome();    
        }
    }, [user, userId, user.email, loading]);
    


  return (
    <SafeAreaView className='h-4 py-10 mx-4 flex'>
      <View className='px-4 py-12 items-center'>
        <View className='flex-row h-10 mt-12 py-12' />
        <TouchableOpacity
          activeOpacity={0.7}
          className='h-12  rounded-lg items-center my-5'
          onPress={handleLogin}
        >
          <Feather
            name="user"
            color={colors.green[400]}
            size={52}
          />
          <Text className='text-green-400 text-2xl'>
            Login
          </Text>        
        </TouchableOpacity>
       
       <View className='p-12'>
        <Logo />
       </View>
        
        <Text className='text-zinc-400 py-6'>
          um passo de cada vez.
        </Text>
      </View>
    </SafeAreaView>
  )
}