import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import en_US from './src/locales/en_US.json'
import pt_BR from './src/locales/pt_BR.json'

import { 
  useFonts, 
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_300Light
} from '@expo-google-fonts/montserrat';

import { Routes } from '@routes/index';

import themes from '@themes/index'
import { AuthProvider } from '@hooks/auth'
import { UpdatesProvider } from '@hooks/updates';

i18n.translations = {
  en: en_US,
  pt: pt_BR
}

i18n.locale = Localization.locale

i18n.fallbacks = true

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
      <UpdatesProvider>
        <AuthProvider>
          <Routes />
          <StatusBar translucent barStyle={'dark-content'} backgroundColor={'#0000'}/>
        </AuthProvider>
      </UpdatesProvider>
    </ThemeProvider>
  )
}