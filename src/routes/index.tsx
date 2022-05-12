import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { useAuth } from '../hooks/auth'

import { UserDocumentProvider } from '../hooks/user_document'
import { CurrentPetProvider } from '../hooks/pet_document'
import { MatchProvider } from '../hooks/match'
import { MatchModal } from '@components/MatchModal'

export function Routes() {

  const { user } = useAuth()

  return (
    <NavigationContainer>
      { user?.uid ? (
        <UserDocumentProvider>
          <CurrentPetProvider>
            <MatchProvider>
              <MatchModal />
              <AppRoutes />
            </MatchProvider>
          </CurrentPetProvider>
        </UserDocumentProvider>
      ) : <AuthRoutes /> }
    </NavigationContainer>
  )
}