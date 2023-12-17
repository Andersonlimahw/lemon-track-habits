import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { useToast } from 'react-native-toast-notifications';
import { AuthContext } from '../../context/AuthContext';

export const LoginScreen = () => {
  const { navigate } = useNavigation();
  const toast = useToast();

  const { login, user } = useContext(AuthContext);

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
        if(user && user.id !== "" && user.uid) {
          toast.show("Bem-vindo", {
            type: 'success',
            placement: 'bottom',
            duration: 1000,
            animationType: 'slide-in',
          });           
        }
    }, [user]);

  // TODO : Login layout

  return (
    <View className='h-4 py-10 mx-4 container flex'>
      <Text className='text-zinc-400'>
        Bem-vindo ao seu novo assistente de hábitos.
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        className='flex-row h-12 rounded-lg items-center my-5'
        onPress={handleLogin}
      >
        <Feather
          name="at-sign"
          color={colors.zinc[500]}
          size={40}
        />
        <Text className='text-zinc-400'>
          Login com google
        </Text>
       
      </TouchableOpacity>
    </View>
  )
}