import React from 'react';

import { 
  useFonts, 
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_300Light
} from '@expo-google-fonts/montserrat';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import { Routes } from './src/routes';

import themes from './src/themes';

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
      <Routes />
    </ThemeProvider>
  );
}