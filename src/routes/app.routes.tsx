import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { CardStyleInterpolators } from '@react-navigation/stack';

import { AppRoutesParams } from "../types/routes";
import { usePet } from '../hooks/pet_document';
import { useUserDocument } from '@hooks/user_document';

import { Matches } from '@screens/Matches';
import { Home } from '@screens/Home';
import { Profile } from "@screens/Profile";
import { Presentation } from '@screens/Presentation';
import { Settings } from '@screens/Settings';
import { Localization } from '@screens/Localization';
import { Feedback } from '@screens/Feedback';
import { CreatePet } from '@screens/CreateProfile';
import { History } from '@screens/History';

const { Navigator, Screen } = createSharedElementStackNavigator<AppRoutesParams>()

export function AppRoutes() {

  const { userHasAPet } = usePet()
  const { userDocumentCreated } = useUserDocument()

  const initialRouteName = userDocumentCreated ? userHasAPet ? 'home' : 'create_profile' : 'localization'

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
      initialRouteName={initialRouteName}
    >
      <Screen 
        component={Home}
        name='home'
      />
      <Screen 
        component={Localization}
        name='localization'
      />
      <Screen 
        component={CreatePet}
        name='create_profile'
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
        component={Feedback} 
        name='feedback' 
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />

      <Screen 
        component={History} 
        name='history' 
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