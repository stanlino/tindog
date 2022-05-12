import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import messaging from '@react-native-firebase/messaging'
import firestore from '@react-native-firebase/firestore'
import { BlurView } from '@react-native-community/blur'

import { useMatch } from '../../hooks/match'

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

export function MatchModal(){

  const { fetchMatchDocuments } = useMatch()

  const [isVisible, setIsVisible] = useState(true)
  const [pets, setPets] = useState([] as Pet[])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setIsVisible(true)
      
      const data = remoteMessage.data
      
      if (!data) return

      const pets = JSON.parse(data.pets)

      const petsDocuments = await firestore().collection('pets').where(firestore.FieldPath.documentId(), 'in', pets).get()
      
      const prevPets: Pet[] =  []

      petsDocuments.docs.forEach(document => {
        
        const docData = document.data()

        prevPets.push({
          photo: docData.photo,
          name: docData.name
        })

      })

      setPets(prevPets)
      fetchMatchDocuments()

    });

    return unsubscribe;
  }, []);

  return (
    <Modal visible={isVisible} onRequestClose={() => setIsVisible(false)} transparent animationType='fade'>
      <Container>
        <BlurView blurType='light' blurAmount={100} style={{ 
          position: 'absolute', 
          top: 0,
          left: 0,
          bottom: 0,
          right: 0  
        }} />
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
        <Touchable style={{
          shadowColor: '#000',
          shadowOpacity: 0.54,
          shadowRadius: 3.21,
          shadowOffset: {
            width: 4,
            height: 0
          },
          elevation: 4
        }} onPress={() => setIsVisible(false)}>
          <TouchableText>
            Legau 😻
          </TouchableText>
        </Touchable>
      </Container>
    </Modal>
  )
}