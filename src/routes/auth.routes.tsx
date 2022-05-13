import React, { useEffect } from 'react'

import { 
  CardStyleInterpolators,  
} from "@react-navigation/stack";
import SplashScreen from 'react-native-splash-screen';

import { SignIn } from "@screens/SignIn";
import { Welcome } from '@screens/SignIn/welcome';

import { AuthRoutesParams } from 'src/types/routes';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const { Navigator, Screen } = createSharedElementStackNavigator<AuthRoutesParams>()

export function AuthRoutes() {

  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 300 } },
          close: { animation: 'timing', config: { duration: 300 } },
        },
      }}
      initialRouteName='welcome'
    >
      <Screen name="welcome" component={Welcome}/>
      <Screen name="index" component={SignIn}/>
    </Navigator>
  )
}