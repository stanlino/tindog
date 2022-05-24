import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import { Pet } from '../../../hooks/pet_document'
import { useAuth } from '../../../hooks/auth';

import { AppRoutesParams } from '@types_/routes';

import { 
  Image,
  MatchView, 
  Name, 
  Bellow
} from './styles'

type MatchData = {
  id: string
  pets: string[]
  itsAMatch: boolean
  contacts: string[]
  suitor: Pet
}

interface ProfileProps {
  item: MatchData
  index: number
}

export function Profile({ item, index } : ProfileProps){

  const { navigate } = useNavigation<StackNavigationProp<AppRoutesParams, 'profile'>>()

  const { user } = useAuth()

  function getOwnerContact() {
    const contact = item.contacts.find(contact => {
      if (contact !== user?.email ?? user?.phoneNumber) {
        return contact
      }

    })
    return contact
  }

  function naviteToProfile() {
    const contact = getOwnerContact()

    navigate('presentation', {
      pet: item.suitor,
      itsAMatch: true,
      contact
    })
  }

  return (
    <MatchView 
      style={{ 
        elevation: 2,
        aspectRatio: 41/57
      }}
      from={{
        translateY: 100
      }}
      animate={{
        translateY: 0
      }}
      transition={{
        mass: 1,
        damping: 15,
        delay: 100 * (index + 1)
      }}
    >
      <TouchableOpacity activeOpacity={.9} onPress={naviteToProfile}>
        <Image source={{ uri: item.suitor.photo }} />
        <Bellow>
          <Name adjustsFontSizeToFit>{item.suitor.name}</Name>
        </Bellow>
      </TouchableOpacity>
    </MatchView>
  )
}