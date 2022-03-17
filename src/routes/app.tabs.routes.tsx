import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { Profile } from "@screens/Profile";

import { HomeStack, MatchesStack } from './app.stack.routes';


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
        name='home_stack' 
        component={HomeStack} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open-page-variant" size={RFValue(40)} color={color} />
        }}
      />
      <Screen
        name='matches_stack' 
        component={MatchesStack} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="puzzle-heart" size={RFValue(40)} color={color} />
        }}
      />
      <Screen
        name='profile'
        initialParams={{
          isMyProfile: true,
          photo: 'https://static1.patasdacasa.com.br/articles/7/44/7/@/1498-algumas-racas-de-cachorro-sao-mais-indep-opengraph_1200-1.jpg',
          name: 'John',
          sex: 'Macho',
          age: 2019,
          adjective: 'Carinhoso',
          description: 'John é um cachorro legau'
        }}
        component={Profile} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cat" size={RFValue(40)} color={color} />
        }}
      />
    </Navigator>
  )
}