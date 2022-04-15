import React from 'react'

import { 
  CardStyleInterpolators, 
  createStackNavigator 
} from "@react-navigation/stack";

import { SignIn } from "@screens/SignIn";
import { PhoneSignIn } from "@screens/SignIn/phoneSignIn";
import { Welcome } from '@screens/SignIn/welcome';

import { AuthRoutesParams } from 'src/types/routes';

const { Navigator, Screen } = createStackNavigator<AuthRoutesParams>()

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
      initialRouteName='welcome'
    >
      <Screen name="welcome" component={Welcome}/>
      <Screen name="index" component={SignIn}/>
      <Screen name="phone" component={PhoneSignIn}/>
    </Navigator>
  )
}