import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import { 
  useFonts, 
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_300Light
} from '@expo-google-fonts/montserrat';

import { Routes } from './src/routes';

import themes from './src/themes'
import { AuthProvider } from './src/hooks/auth'

export default function App() {
 
  const [loaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_300Light
  })

  if (!loaded) {
    return <AppLoading />
  }
 
  return (
    <ThemeProvider theme={themes}>
      <AuthProvider>
        <Routes />
        <StatusBar translucent backgroundColor={'#0003'}/>
      </AuthProvider>
    </ThemeProvider>
  )
}