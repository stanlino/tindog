import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useNavigation, NavigationProp } from '@react-navigation/native'

import { Pet } from '../../../hooks/pet'
import { RandomRrofileRoutesParams } from '../../../types/routes'

import { 
  Avatar,
  MatchView, 
  Name, 
  Side, 
  Text, 
  Touchable 
} from './styles'

type MatchData = {
  id: string
  pets: string[]
  itsAMatch: boolean
}

interface ProfileProps {
  item: MatchData
  currentPet: Pet
}

export function Profile({ item, currentPet } : ProfileProps){

  const [petProfile, setPetProfile] = useState({} as Pet)

  const { navigate } = useNavigation<NavigationProp<RandomRrofileRoutesParams, 'index'>>()

  const petId = item.pets.find(pet => {
    if (pet !== currentPet.id!) {
      return pet
    }

    return pet
  })  

  useEffect(() => {
    async function getPetDoc() {
      const petDoc = await firestore().collection('pets').doc(petId).get()
      setPetProfile({ ...petDoc.data(), id: petDoc.id } as Pet) 
    }

    getPetDoc()
  }, [])

  return (
    <MatchView style={{ elevation: 5 }}>
      <Avatar source={{ uri: petProfile.photo }} />
      <Side>
        <Name>{petProfile.name}</Name>
        <Touchable onPress={() => navigate('randomProfile', {
          pet: petProfile,
          sharedElement: false
        })}>
          <Text>Visualizar perfil</Text>
        </Touchable>
      </Side>
    </MatchView>
  )
}