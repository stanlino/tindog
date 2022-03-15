import React from 'react'

import { 
  CardStyleInterpolators, 
  createStackNavigator 
} from "@react-navigation/stack";

import { SignIn } from "@screens/SignIn";
import { PhoneSignIn } from "@screens/SignIn/phoneSignIn";

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <Screen name="index" component={SignIn}/>
      <Screen name="phone" component={PhoneSignIn}/>
    </Navigator>
  )
}