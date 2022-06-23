import React, { useEffect } from 'react'

import SplashScreen from 'react-native-splash-screen';

import { SignIn } from "@screens/SignIn";
import { Welcome } from '@screens/SignIn/welcome';

import { AuthRoutesParams } from 'src/types/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesParams>()

export function AuthRoutes() {

  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
      initialRouteName='welcome'
    >
      <Screen name="welcome" component={Welcome}/>
      <Screen name="index" component={SignIn}/>
    </Navigator>
  )
}