import React, { useEffect } from 'react'
import { Profile } from "@screens/Profile";
import SplashScreen from 'react-native-splash-screen'

import { AppRoutesParams } from "../types/routes";
import { usePet } from '../hooks/pet_document';
import { Matches } from '@screens/Matches';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Home } from '@screens/Home';
import { Presentation } from '@screens/Presentation';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { Settings } from '@screens/Settings';

const { Navigator, Screen } = createSharedElementStackNavigator<AppRoutesParams>()

export function AppRoutes() {

  const { userHasAPet } = usePet()

  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <Navigator 
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: false,
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 300 } },
          close: { animation: 'timing', config: { duration: 300 } },
        },
      }}
      initialRouteName={userHasAPet ? 'home' : 'profile'}
    >
      <Screen 
        component={Home}
        name='home'
      />
      <Screen 
        component={Presentation} 
        name='presentation' 
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Screen 
        component={Settings} 
        name='settings' 
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />

      <Screen
        name='matches' 
        component={Matches}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
      
      <Screen
        name='profile'
        component={Profile} 
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureDirection: 'horizontal-inverted'
        }}
      />
    </Navigator>
  )
}