import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { MyProfile } from "@screens/MyProfile";

import { AppRoutesParams } from "../types/routes";
import { usePet } from '../hooks/pet';
import { RamdomProfileRoutes } from './stack/randomProfile';

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParams>()

export function AppRoutes() {

  const { COLORS } = useTheme()
  const { userHasAPet } = usePet()

  return (
    <Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: RFValue(60),
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: '#f2f2f2',
          borderRadius: 35,
          overflow: 'hidden'
        },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.TITLE,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false
      }}
      initialRouteName={userHasAPet ? 'home' : 'profile'}
    >
    {userHasAPet && (<>
      <Screen
        name='home' 
        component={RamdomProfileRoutes}
        initialParams={{ route: 'home' }} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open-page-variant" size={RFValue(28)} color={color} />,
        }}
      />
      <Screen
        name='matches' 
        component={RamdomProfileRoutes}
        initialParams={{ route: 'matches' }} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="puzzle-heart" size={RFValue(28)} color={color} />,
        }}
      />
    </>)}
      <Screen
        name='profile'
        component={MyProfile} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cat" size={RFValue(28)} color={color} />,
        }}
      />
    </Navigator>
  )
}