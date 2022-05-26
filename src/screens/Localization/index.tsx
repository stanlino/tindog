import React, { useState } from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import * as Location from 'expo-location'
import { StackActions } from '@react-navigation/native'

import { LocalizationScreenProps } from '@types_/routes'

import { useUserDocument } from '@hooks/user_document'
import { useAuth } from '@hooks/auth'

import { Container } from '@components/Container'
import { Button } from '@components/Button'

import {
  Wrapper,
  Span
} from './styles'

export function Localization({ navigation } : LocalizationScreenProps){

  const [loading, setLoading] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)

  const { updateUserDocument } = useUserDocument()
  const { user } = useAuth()

  async function getUserLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      return 'NOT'
    }

    setLoading(true)

    const location = await Location.getCurrentPositionAsync({})

    try {
      const response = await fetch(`https://tindog-messaging-api.herokuapp.com/localization/localization?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`)
      const text = await response.text()

      return text as unknown as string
    } catch {
      return 'ERROR'
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateUserDocument() {
    const user_location = await getUserLocation()
    if (user_location === 'ERROR') return setPermissionDenied(true)
    if (user_location === 'NOT') return setPermissionDenied(true)

    updateUserDocument({
      user_name: user.displayName!,
      user_location: user_location
    })

    navigation.dispatch(StackActions.replace('profile'))
  }

  return (
    <Container>
      <Wrapper>
        <AnimatedLottieView 
          source={require('@assets/lottie/location.json')}
          style={{
            width: RFPercentage(40),
          }}
          autoPlay
          loop={false}
        />
        <Span>
          Por favor, habilite o acesso a localizão para que possamos buscar por pets próximos a você.
        </Span>
      </Wrapper>
      <Button title='Prosseguir' loading={loading} onPress={handleCreateUserDocument} />
    </Container>
  )
}