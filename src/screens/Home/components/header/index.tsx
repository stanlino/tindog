import React from 'react'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { AppRoutesParams } from 'src/types/routes'

import {
  Container, 
  TouchableOpacity,
  AppMenu
} from './styles'

export function Header(){

  const { navigate } = useNavigation<StackNavigationProp<AppRoutesParams, 'home'>>()

  return (
    <Container>
      <TouchableOpacity color={'#333b89'} onPress={() => navigate('profile')}>
        <MaterialCommunityIcons name="dog" size={30} color="#333b89" />
      </TouchableOpacity>

      <AppMenu onPress={() => navigate('settings')}>
        <Feather name="settings" size={30} color="#fff" />
      </AppMenu>
      
      <TouchableOpacity color={'#cf3247'} onPress={() => navigate('matches')}>
        <MaterialCommunityIcons name="puzzle-heart" size={30} color="#cf3247" />
      </TouchableOpacity>
    </Container>
  )
}