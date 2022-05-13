import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'react-native-deck-swiper'
import firestore from '@react-native-firebase/firestore'
import AnimatedLottieView from 'lottie-react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { usePet, Pet } from '../../hooks/pet_document'
import { useAuth } from '../../hooks/auth'

import { HomeScreenProps } from '../../types/routes'

import { likeProfile, viewProfile } from './utils/firestore'

import { ActionButton } from './components/action_button'
import { AnimatedBackground } from './components/animated_background'
import { Header } from './components/header'
import { Tutorial } from './components/tutorial_modal'

import { 
  Container,
  Wrapper,
  Card,
  Photo,
  Footer,
  Span,
  Content,
  Name,
  Location,
} from './styles'

export function Home({ navigation } : HomeScreenProps){

  const { pets, currentPet, visualizedProfiles, updateVisualizedProfiles } = usePet()
  const { user } = useAuth()

  const [petProfiles, setPetProfiles] = useState([] as Pet[])
  const [currentProfile, setCurrentProfile] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const swiperRef = useRef<any>()

  const excludedProfiles = visualizedProfiles.concat(pets.map(pet => pet.id!))

  function handleSwipeToLeft() {
    swiperRef.current.swipeLeft()
  }

  function handleSwipeToRight() {
    swiperRef.current.swipeRight()
  }
  
  function naviteToProfile() {
    navigation.navigate('profile_presentation', {
      pet: petProfiles[currentProfile],
    })
  }

  function handleRejectProfile() {
    updateVisualizedProfiles(petProfiles[currentProfile].id!)
    viewProfile(currentPet.id!, petProfiles[currentProfile].id!, 'reject')
  }

  function handleLikeProfile() {
    updateVisualizedProfiles(petProfiles[currentProfile].id!)
    viewProfile(currentPet.id!, petProfiles[currentProfile].id!, 'like')
    likeProfile(currentPet!, petProfiles[currentProfile], user?.email ?? user?.phoneNumber as string)
  }

  useEffect(() => {
    firestore().collection('pets')
      .where('location', '==', currentPet?.location)
      .where('sex', '==', currentPet?.sex === 'male' ? 'female' : 'male')
      .where('species', '==', currentPet.species)
      .where(firestore.FieldPath.documentId(), 'not-in', excludedProfiles)
      .get()
      .then(docs => {
        const petList: Pet[] = []
        docs.forEach(doc => {
          petList.push({ ...doc.data(), id: doc.id } as Pet)
        })
        setPetProfiles(petList)
      })
      .finally(() => setIsLoading(false))
  },[])

  const noHaveProfiles = !petProfiles[0] || currentProfile === petProfiles.length
  const allProfilesViewed = visualizedProfiles.length > 0 

  return (
    <Container>
      
      <AnimatedBackground />
      <Header />

      <Tutorial />
    
      <Wrapper>
        {
          isLoading ? (
            <AnimatedLottieView 
              source={require('@assets/lottie/cat-loading.json')}
              style={{
                width: RFPercentage(40),
              }}
              autoPlay
              loop
              speed={2}
            />
          ) : noHaveProfiles ? (
            <AnimatedLottieView
              source={require('@assets/lottie/cat-in-box.json')}
              style={{
                width: RFPercentage(40),
              }}
              autoPlay
              loop
              speed={0.5}
            />
          ) : (
            <Swiper
              ref={swiperRef}
              cards={petProfiles}
              verticalSwipe={false}
              cardIndex={currentProfile}
              onSwiped={() => setCurrentProfile(index => index + 1)}
              onSwipedLeft={handleRejectProfile}
              onSwipedRight={handleLikeProfile}
              onTapCard={naviteToProfile}
              stackSize={5}
              animateCardOpacity
              backgroundColor='transparent'
              overlayLabels={{
                left: {
                  title: 'PASSO',
                  style: {
                    label: {
                      textAlign: 'right',
                      color: 'red',
                      fontSize: 22,
                      marginTop: -60
                    }
                  }
                },
                right: {
                  title: 'GOSTEI',
                  style: {
                    label: {
                      textAlign: 'left',
                      color: 'green',
                      fontSize: 22,
                      marginTop: -60
                    }
                  }
                }
              }}
              renderCard={(profile) => {
                return (
                  <Card>
                    <Photo source={{ uri: profile.photo }} />
                    <Content>
                      <Name>{profile.name}</Name>
                      <Location>{profile.location}</Location>
                    </Content>
                  </Card>
                )
              }}
            />
          )
        }
      </Wrapper>

      <Footer>
        {
          !isLoading ? !noHaveProfiles ? (
            <>
              <ActionButton type='reject' action={handleSwipeToLeft} />
              <ActionButton type='like' action={handleSwipeToRight} />
            </>
          ) : allProfilesViewed ? (
            <Span>Você já visualizou todos os perfis desta região</Span>
          ) : (
            <Span>Ainda não há perfis nessa região</Span>
          ) : (
            <Span>Buscando perfis ...</Span>
          )
        }
      </Footer>

    </Container>
  )
}