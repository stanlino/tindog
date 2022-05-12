import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
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
      <TouchableOpacity color={'#fff'} onPress={() => navigate('profile')}>
        <MaterialCommunityIcons name="dog" size={30} color="#fff" />
      </TouchableOpacity>

      <AppMenu onPress={() => navigate('settings')}>
        
      </AppMenu>
      
      <TouchableOpacity color={'#cf3247'} onPress={() => navigate('matches')}>
        <MaterialCommunityIcons name="puzzle-heart" size={30} color="#cf3247" />
      </TouchableOpacity>
    </Container>
  )
}