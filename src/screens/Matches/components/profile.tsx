import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { Alert, Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Pet, usePet } from '../../../hooks/pet_document'
import { useAuth } from '../../../hooks/auth';

import { AppRoutesParams } from '@types_/routes';

import { 
  Avatar,
  MatchView, 
  Name, 
  Bellow
} from './styles'

type MatchData = {
  id: string
  pets: string[]
  itsAMatch: boolean
  contacts: string[]
}

interface ProfileProps {
  item: MatchData
}

export function Profile({ item } : ProfileProps){

  const { currentPet } = usePet()

  const { navigate } = useNavigation<StackNavigationProp<AppRoutesParams, 'profile'>>()

  const [petProfile, setPetProfile] = useState({} as Pet)
  const { user } = useAuth()

  const petId = item.pets.find(pet => pet !== currentPet.id!)  

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
      pet: petProfile,
      itsAMatch: true,
      contact
    })
  }

  useEffect(() => {
    async function getPetDoc() {
      const petDoc = await firestore().collection('pets').doc(petId).get()
      setPetProfile({ ...petDoc.data(), id: petDoc.id } as Pet) 
    }

    getPetDoc()
  }, [])

  return (
    <MatchView 
      style={{ 
        elevation: 2,
        aspectRatio: 41/57
      }} 
      onPress={naviteToProfile}
    >
      <Avatar source={{ uri: petProfile.photo }} />
      <Bellow>
        <Name adjustsFontSizeToFit>{petProfile.name}</Name>
      </Bellow>
    </MatchView>
  )
}