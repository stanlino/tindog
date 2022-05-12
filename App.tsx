import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

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
    return null
  }
 
  return (
    <ThemeProvider theme={themes}>
      <AuthProvider>
        <Routes />
        <StatusBar translucent barStyle={'dark-content'} backgroundColor={'#0000'}/>
      </AuthProvider>
    </ThemeProvider>
  )
}