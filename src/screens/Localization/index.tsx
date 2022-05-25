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

  const [permissionDenied, setPermissionDenied] = useState(false)

  const { updateUserDocument } = useUserDocument()
  const { user } = useAuth()

  async function getUserLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      return 'ERROR'
    }

    const location = await Location.getCurrentPositionAsync({})

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyDfqFNagXY959SW3VdHWy2Zl-BjShtfWwk`)
      const json = await response.json()

      const city = json['results'][0]['address_components'][3]['long_name']
      const state = json['results'][0]['address_components'][4]['long_name']

      const user_location = `${city} - ${state}`
      return user_location
    } catch {
      return 'ERROR'
    }
  }

  async function handleCreateUserDocument() {
    const user_location = await getUserLocation()

    if (user_location === 'ERROR') return setPermissionDenied(true)

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
      <Button title='Prosseguir' onPress={handleCreateUserDocument} />
    </Container>
  )
}