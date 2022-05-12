import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { AntDesign } from '@expo/vector-icons'; 

import { Pet, usePet } from '../../../hooks/pet_document'
import { useAuth } from '../../../hooks/auth';

import { 
  Avatar,
  MatchView, 
  Name, 
  Side, 
  Adjective, 
  Touchable 
} from './styles'
import { Alert, Linking } from 'react-native';

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

  const [petProfile, setPetProfile] = useState({} as Pet)
  const { user } = useAuth()

  const petArticle = petProfile.sex === 'male' ? 'o' : 'a'

  const petId = item.pets.find(pet => pet !== currentPet.id!)  

  function getOwnerContact() {
    const contact = item.contacts.find(contact => {
      if (contact !== user?.email ?? user?.phoneNumber) {
        return contact
      }

    })
    return contact
  }

  function getContactType() {
    const contact = getOwnerContact()
    const isEmail = contact?.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    
    if (isEmail) return 'email'
    return 'phoneNumber'

  }

  async function redirectToZapOrEmail() {
    const contact = getOwnerContact()
    const contactType = getContactType()

    const message = 'Oi tudo bem? Nossos pets deram match no tindog!, vamos planejar o casamento, ou ja pulamos pra lua de mel?'

    const subject = 'Nós demos um match no tindog!'

    const announcement = `Oi! Não tem chat 😿 mas eu estou desenvolvendo um 😻 \n \nPor enquanto você pode conversar com @ responsável d${petArticle} ${petProfile.name}`

    if (contactType == 'email') {
      const email = contact
      
      const url = `mailto:${email}?subject=${subject}&body=${message}`

      Alert.alert('Redirecionamento', `${announcement} via email!! Sinta-se a vontade para editar o corpo do email previamente já escrito 😺`, [
        { text: 'Cancelar' },
        { text: 'Conferir Email', onPress: () => {
          Linking.openURL(url)
        }}
      ])

    } else {
      const numberPhone = contact?.substring(0) //remove +55
      const url = `https://wa.me/${numberPhone}?text=${message}`

      const supported = await Linking.canOpenURL(url)

      if (supported) {
        Alert.alert('Redirecionamento', `${announcement} pelo zap! `, [
          { text: 'Cancelar' },
          { text: 'Vamo pro zap', onPress: () => {
            Linking.openURL(url)
          } }
        ])
      }
    }
  }

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
        <Name adjustsFontSizeToFit>{petProfile.name}</Name>
      </Side>
      <Touchable onPress={redirectToZapOrEmail}>
        <AntDesign name="right" size={30} color="#333b89" />
      </Touchable>
    </MatchView>
  )
}