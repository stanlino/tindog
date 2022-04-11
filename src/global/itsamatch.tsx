import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import messaging from '@react-native-firebase/messaging'
import firestore from '@react-native-firebase/firestore'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import {
  Container, 
  Pet, 
  PetImage, 
  PetName, 
  Row, 
  Title, 
  Touchable, 
  TouchableText,
  Match,
  Icon
} from './styles'

type Pet = {
  photo: string
  name: string
}

export function ItsAMatch(){

  const [isVisible, setIsVisible] = useState(false)
  const [pets, setPets] = useState([] as Pet[])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setIsVisible(true)
      
      const data = remoteMessage.data
      
      if (!data) return

      const pets = JSON.parse(data.pets)

      const petsDocuments = await firestore().collection('pets').where(firestore.FieldPath.documentId(), 'in', pets).get()
      
      const prevPets: Pet[] = []

      petsDocuments.docs.forEach(document => {
        
        const docData = document.data()

        prevPets.push({
          photo: docData.photo,
          name: docData.name
        })

      })

      setPets(prevPets)

    });

    return unsubscribe;
  }, []);

  return (
    <Modal visible={isVisible} transparent animationType='fade'>
      <Container>
        <Title>It's a Match!</Title>
        <Row>
          {
            pets.map((pet, index) => (
              <Match key={pet.photo}>
                <Pet>
                  <PetImage source={{ uri: pet.photo }} />
                  <PetName>
                    {pet.name}
                  </PetName>
                </Pet>
                {index < 1 && <Icon name="puzzle-heart" size={50} color={'#fff'} />}
              </Match>
            ))
          }
        </Row>
        <AnimatedLottieView
          source={require('@assets/lottie/dancing-dog.json')}
          style={{
            width: RFPercentage(40),
          }}
          autoPlay
          loop
        />
        <Touchable onPress={() => setIsVisible(false)}>
          <TouchableText>
            Meu casal 😻
          </TouchableText>
        </Touchable>
      </Container>
    </Modal>
  )
}