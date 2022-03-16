import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { Profile } from "@screens/Profile";

import { AppRoutesParams } from "src/types/routes";

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParams>()

export function AppRoutes() {

  const { COLORS } = useTheme()

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: RFValue(75)
      },
      tabBarActiveTintColor: COLORS.PRIMARY,
      tabBarInactiveTintColor: COLORS.TITLE,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true
    }}>
      <Screen
        name='profile' 
        component={Profile} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cat" size={RFValue(45)} color={color} />
        }}
      />
    </Navigator>
  )
}