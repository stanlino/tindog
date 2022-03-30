import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'react-native-deck-swiper'
import firestore from '@react-native-firebase/firestore'

import { Container } from '@components/Container'
import { usePet, Pet } from '../../hooks/pet'

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
  NoHaveMoreProfiles
} from './styles'


export function Home(){

  const { pets, currentPet, visualizedProfiles } = usePet()

  const [petProfiles, setPetProfiles] = useState([] as Pet[])

  const [currentProfile, setCurrentProfile] = useState(0)
  const swiperRef = useRef<any>()

  const excludedProfiles = visualizedProfiles.concat(pets.map(pet => pet.id!))

  function handleSwipeToLeft() {
    swiperRef.current.swipeLeft()
  }

  function handleSwipeToRight() {
    swiperRef.current.swipeRight()
  }

  function handleViewProfile() {
    firestore().collection('pets').doc(currentPet?.id).collection('visualized').add({
      petUID: petProfiles[currentProfile].id
    })
  }

  async function handleLikeProfile() {
    handleViewProfile()
    const thisMatchDontExists = (await firestore().collection('matchs').where('interesting', '==', currentPet.id).get()).empty
    if (thisMatchDontExists) {
      firestore().collection('matchs').add({
        interestingID: petProfiles[currentProfile].id,
        interestingName: petProfiles[currentProfile].name,
        interestingPhoto: petProfiles[currentProfile].photo,
        interestedID: currentPet.id,
        interestedName: currentPet.name,
        interestedPhoto: currentPet.photo,
        itsAMatch: false
      })
    } else {
      firestore()
      .collection('matchs')
      .where('interesting', '==', currentPet.id)
      .where('interested', '==', petProfiles[currentProfile].id)
      .get()
      .then(docs => {
        docs.forEach(doc => {
          doc.ref.update({
            itsAMatch: true
          })
        })
      })
    }
    
  }

  function handleRejectProfile() {
    handleViewProfile()
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
    return (
      <Container>
        <Title>
          tindog
        </Title>
        <Content>
          <NoHaveMoreProfiles>
            Não há perfis não visualizados nessa região
          </NoHaveMoreProfiles>
        </Content>
      </Container>
    )
  }

  return (
    <Container>
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
          stackSize={petProfiles.length}
          stackScale={10}
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