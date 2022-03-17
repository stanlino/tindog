import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { Matches } from '@screens/Matches'

const { Navigator, Screen } = createStackNavigator()

export function HomeStack() {
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen name="home" component={Home}/>
      <Screen name="profile" component={Profile}/>
    </Navigator>
  )
}

export function MatchesStack() {
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen name="matches" component={Matches}/>
      <Screen name="profile" component={Profile}/>
    </Navigator>
  )
}