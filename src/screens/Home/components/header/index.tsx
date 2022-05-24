import React from 'react'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { AppRoutesParams } from 'src/types/routes'

import {
  Container, 
  AppMenu
} from './styles'
import { SmallButton } from '@components/SmallButton'

export function Header(){

  const { navigate } = useNavigation<StackNavigationProp<AppRoutesParams, 'home'>>()

  return (
    <Container>
      <SmallButton color='#535a9b' onPress={() => navigate('profile')}>
        <MaterialCommunityIcons name="dog" size={30} color="#fff" />
      </SmallButton>

      <AppMenu onPress={() => navigate('settings')}>
        <FontAwesome name="sliders" size={30} color="#fff" />
      </AppMenu>
      
      <SmallButton color={'#e25165'} onPress={() => navigate('matches')}>
        <MaterialCommunityIcons name="puzzle-heart" size={30} color="#fff" />
      </SmallButton>
    </Container>
  )
}