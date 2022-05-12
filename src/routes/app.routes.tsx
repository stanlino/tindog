import React from 'react'
import { Profile } from "@screens/Profile";

import { AppRoutesParams } from "../types/routes";
import { usePet } from '../hooks/pet_document';
import { Matches } from '@screens/Matches';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Home } from '@screens/Home';
import { ProfilePresentation } from '@screens/ProfilePresentation';
import { CardStyleInterpolators } from '@react-navigation/stack';

const { Navigator, Screen } = createSharedElementStackNavigator<AppRoutesParams>()

export function AppRoutes() {

  const { userHasAPet } = usePet()

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
        component={ProfilePresentation} 
        name='profile_presentation' 
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