import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'react-native-deck-swiper'
import firestore from '@react-native-firebase/firestore'

import { Container } from '@components/Container'
import { usePet, Pet } from '../../hooks/pet'
import { handleLikeProfile, handleRejectProfile } from './utils/firestore'

import ProfileModal, { ProfileModalMethods } from '@screens/ProfileModal'

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
  Content,
  NoHaveMoreProfiles,
  TopDetail
} from './styles'

export function Home(){

  const { pets, currentPet, visualizedProfiles } = usePet()

  const [petProfiles, setPetProfiles] = useState([] as Pet[])
  const [currentProfile, setCurrentProfile] = useState(0)

  const swiperRef = useRef<any>()
  const profileModalRef = useRef({} as ProfileModalMethods)

  const excludedProfiles = visualizedProfiles.concat(pets.map(pet => pet.id!))

  function handleSwipeToLeft() {
    swiperRef.current.swipeLeft()
  }

  function handleSwipeToRight() {
    swiperRef.current.swipeRight()
  }

  function handleOpenModal() {
    profileModalRef.current.handleOpenModal()
  }

  useEffect(() => {
    firestore().collection('pets')
      .where('location', '==', currentPet?.location)
      .where(firestore.FieldPath.documentId(), 'not-in', excludedProfiles)
      .get()
      .then(docs => {
        const petList: Pet[] = []
        docs.forEach(doc => {
          petList.push({ ...doc.data(), id: doc.id } as Pet)
        })
        setPetProfiles(petList)
      })
  },[])

  if (!petProfiles[0] || currentProfile === petProfiles.length) {
    if (visualizedProfiles.length === 0) {
      return <NoMoreProfiles text={`Ainda não existem perfis em ${currentPet?.location} :(`} />
    }
    return <NoMoreProfiles text={`Você ja visualizou todos os perfis de ${currentPet?.location}`} />
  }

  return (
    <Container>

      <ProfileModal ref={profileModalRef} pet={petProfiles[currentProfile]} />
      
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
          onTapCard={handleOpenModal}
          onSwipedLeft={() => handleRejectProfile(currentPet.id!, petProfiles[currentProfile].id!)}
          onSwipedRight={() => handleLikeProfile(currentPet!, petProfiles[currentProfile])}
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
                <ProfileImage source={{ uri: profile?.photo }} />
                <ProfileInfo>
                  <ProfileName>{profile?.name}</ProfileName>
                  <ProfileAdjective>{profile?.adjective}</ProfileAdjective>
                </ProfileInfo>
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

function NoMoreProfiles({ text } : { text: string }) {
  return (
    <Container>
      <TopDetail />
      <Title>
        tindog
      </Title>
      <Content>
        <NoHaveMoreProfiles>
          {text}
        </NoHaveMoreProfiles>
      </Content>
    </Container>
  )
}