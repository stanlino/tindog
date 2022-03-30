import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { Profile } from "@screens/Profile";
import { Home } from '@screens/Home';
import { Matches } from '@screens/Matches';

import { AppRoutesParams } from "../types/routes";
import { usePet } from '../hooks/pet';

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParams>()

export function AppRoutes() {

  const { COLORS } = useTheme()
  const { userHasAPet } = usePet()

  return (
    <Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: RFValue(75)
        },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.TITLE,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true
      }}
      initialRouteName={userHasAPet ? 'home' : 'profile'}
    >
      {userHasAPet && (<>
        <Screen
          name='home' 
          component={Home} 
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open-page-variant" size={RFValue(35)} color={color} />
          }}
        />
        <Screen
          name='matches' 
          component={Matches} 
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="puzzle-heart" size={RFValue(35)} color={color} />
          }}
        />
      </>)}
      <Screen
        name='profile'
        component={Profile} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cat" size={RFValue(35)} color={color} />
        }}
      />
    </Navigator>
  )
}