import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.tabs.routes'

import { useAuth } from '../hooks/auth'

export function Routes() {

  const { initializing, user } = useAuth()
  
  if (initializing) {
    return null
  }

  return (
    <NavigationContainer>
      { user?.uid ? <AppRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  )
}