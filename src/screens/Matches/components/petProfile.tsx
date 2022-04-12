import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { AntDesign } from '@expo/vector-icons'; 

import { Pet } from '../../../hooks/pet'
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
  currentPet: Pet
}

export function Profile({ item, currentPet } : ProfileProps){

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

    if (contactType == 'email') {
      const email = contact
      const url = `mailto:${email}.com?subject=${subject}&body=${message}`

      const supported = await Linking.canOpenURL(url)

      if (supported) {
        Alert.alert('Redirecionamento', `O papo agora começa no email!, Confira o email que vamos enviar para o(a) dono(a) d${petArticle} ${petProfile.name}, (modifique o texto se desejar). Ah e não se esqueça de enviar o email!`, [
          { text: 'Cancelar' },
          { text: 'Conferir Email', onPress: () => {
            Linking.openURL(url)
          } }
        ])
      }

    } else {
      const numberPhone = contact?.substring(0) //remove +55
      const url = `https://wa.me/${numberPhone}?text=${message}`

      const supported = await Linking.canOpenURL(url)

      if (supported) {
        Alert.alert('Redirecionamento', `Vou criar uma conversa no Whatsapp com o contato do(a) dono(a) d${petArticle} ${petProfile.name}, lá vocês podem conversar sobre o destino de seus bixinhos!!`, [
          { text: 'Cancelar' },
          { text: 'Continuar', onPress: () => {
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
        <Adjective>{petProfile.adjective}</Adjective>
      </Side>
      <Touchable onPress={redirectToZapOrEmail}>
        <AntDesign name="right" size={30} color="#0003" />
      </Touchable>
    </MatchView>
  )
}