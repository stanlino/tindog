import React, { useState } from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import * as Location from 'expo-location'
import { StackActions } from '@react-navigation/native'
import I18n from 'i18n-js'

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
      const response = await fetch(`https://tindog-messaging-api.herokuapp.com/localization/latlng?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`)
      const reponseJson = await response.json()

      return reponseJson
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
      city: user_location.city,
      state: user_location.state
    })

    navigation.dispatch(StackActions.replace('create_profile'))
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
          {I18n.t('location_permission')}
        </Span>
      </Wrapper>
      <Button title={I18n.t('next')} loading={loading} onPress={handleCreateUserDocument} />
    </Container>
  )
}