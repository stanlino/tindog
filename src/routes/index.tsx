import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.tabs.routes'

import { useAuth } from '../hooks/auth'
import { FirestoreProvider } from '../hooks/firestore'
import { PetProvider } from '../hooks/pet'

export function Routes() {

  const { user } = useAuth()

  return (
    <NavigationContainer>
      { user?.uid ? (
        <FirestoreProvider>
          <PetProvider>
            <AppRoutes />
          </PetProvider>
        </FirestoreProvider>
      ) : <AuthRoutes /> }
    </NavigationContainer>
  )
}