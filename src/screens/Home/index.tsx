import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'react-native-deck-swiper'
import firestore from '@react-native-firebase/firestore'
import { SharedElement } from 'react-navigation-shared-element'

import { Container } from '@components/Container'
import { usePet, Pet } from '../../hooks/pet'
import { likeProfile, viewProfile } from './utils/firestore'
import { IndexScreenProps } from '../../types/routes'

import { NoMoreProfiles } from './components/noMoreProfiles'
import { Loading } from './components/loading'

import { 
  Title,
  Profiles,
  Profile,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileAdjective,
  Footer,
  Button,
  Icon,
  TopDetail,
} from './styles'


export function Home({ navigation } : IndexScreenProps){

  const { pets, currentPet, visualizedProfiles, updateVisualizedProfiles } = usePet()

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
    navigation.navigate('randomProfile', {
      pet: petProfiles[currentProfile],
      sharedElement: true
    })
  }

  function handleRejectProfile() {
    updateVisualizedProfiles(petProfiles[currentProfile].id!)
    viewProfile(currentPet.id!, petProfiles[currentProfile].id!)
  }

  function handleLikeProfile() {
    updateVisualizedProfiles(petProfiles[currentProfile].id!)
    viewProfile(currentPet.id!, petProfiles[currentProfile].id!)
    likeProfile(currentPet!, petProfiles[currentProfile])
  }

  useEffect(() => {
    firestore().collection('pets')
      .where('location', '==', currentPet?.location)
      .where('sex', '==', currentPet?.sex === 'male' ? 'female' : 'male')
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

  if (isLoading) return <Loading />

  if (!petProfiles[0] || currentProfile === petProfiles.length) {
    if (visualizedProfiles.length === 0) {
      return <NoMoreProfiles text={`Ainda não existem perfis em ${currentPet?.location} :(`} />
    }
    return <NoMoreProfiles text={`Você ja visualizou todos os perfis de ${currentPet?.location}`} />
  }

  return (
    <Container>
      
      <TopDetail />
      
      <Title>tindog</Title>
      
      <Profiles>
        <Swiper
          ref={swiperRef}
          cards={petProfiles}
          keyExtractor={item => item?.id!}
          verticalSwipe={false}
          cardIndex={currentProfile}
          onSwiped={() => setCurrentProfile(index => index + 1)}
          onSwipedLeft={handleRejectProfile}
          onSwipedRight={handleLikeProfile}
          onTapCard={naviteToProfile}
          stackSize={petProfiles.length}
          stackScale={5}
          animateCardOpacity
          animateOverlayLabelsOpacity
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          backgroundColor='transparent'
          renderCard={(profile) => {
            return (
              <Profile>
                <SharedElement id={profile?.id!}>
                  <>
                    <ProfileImage source={{ uri: profile?.photo }} />
                    <ProfileInfo>
                      <ProfileName>{profile?.name}</ProfileName>
                      <ProfileAdjective>{profile?.adjective}</ProfileAdjective>
                    </ProfileInfo>
                  </>
                </SharedElement>
              </Profile>
            )
          }}
        />
      </Profiles>
      <Footer>
        <Button type='decline' onPress={handleSwipeToLeft}>
          <Icon name='close' type='decline'/>
        </Button>
        <Button type='accept' onPress={handleSwipeToRight}>
          <Icon name='check' type='accept'/>
        </Button>
      </Footer>
    </Container>
  )
}