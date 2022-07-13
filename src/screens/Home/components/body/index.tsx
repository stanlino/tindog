import React, { useCallback, useMemo } from 'react'

import I18n from 'i18n-js'
import AnimatedLottieView from 'lottie-react-native'
import Swiper from 'react-native-deck-swiper'
import { 
  format, 
  intervalToDuration, 
  parse 
} from 'date-fns'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { useAuth } from '@hooks/auth'
import { usePet } from '@hooks/pet_document'
import { useHomeContext } from '@screens/Home/contexts/home'
import { likeProfile, viewProfile } from '@screens/Home/utils/firestore'
import { AppRoutesParams } from '@types_/routes'

import { 
  Container, 
  Card, 
  Content, 
  Location, 
  Name, 
  Photo 
} from './styles'

type DateFormatted = {
  nanoseconds: number
  seconds: number
}

export function Body(){

  const { user } = useAuth()
  const { navigate } = useNavigation<StackNavigationProp<AppRoutesParams, 'home'>>()

  const {
    updateVisualizedProfiles,
    currentPet
  } = usePet()

  const {
    isLoading,
    swiperRef,
    petProfiles,
    currentProfileIndex,
    changeCurrentProfileIndex,
    scope
  } = useHomeContext()

  function handleRejectProfile() {
    updateVisualizedProfiles(petProfiles[currentProfileIndex].id!)
    viewProfile(currentPet.id!, petProfiles[currentProfileIndex].id!, 'reject')
  }

  function handleLikeProfile() {
    updateVisualizedProfiles(petProfiles[currentProfileIndex].id!)
    viewProfile(currentPet.id!, petProfiles[currentProfileIndex].id!, 'like')
    likeProfile(currentPet!, petProfiles[currentProfileIndex], user?.email ?? user?.phoneNumber as string)
  }

  function naviteToProfile(index: number) {
    navigate('presentation', {
      pet: petProfiles[index],
      itsAMatch: false
    })
  }

  const calculateFullAge = useCallback((pet_birth_date: Date) => {
    const date = pet_birth_date as unknown as DateFormatted
    const dateFormatted = new Date(date.seconds * 1000)

    const birthDate = parse(format(dateFormatted, 'dd/MM/yyyy'), "dd/MM/yyyy", new Date())
    const { years, months } = intervalToDuration({ start: birthDate, end: new Date() })

    return `${years} ${I18n.t('year')}${years! > 1 && 's'}${months! > 0 ? `, ${months} ${I18n.t('months')}` : ''}`
  }, [])

  const swiperOverlayLabels = useMemo(() => ({
    left: {
      title: I18n.t('no'),
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
      title: I18n.t('yes'),
      style: {
        label: {
          textAlign: 'left',
          color: 'green',
          fontSize: 22,
          marginTop: -60
        }
      }
    }
  }), [])

  const emptyProfileList = !petProfiles[0] || currentProfileIndex === petProfiles.length

  return (
    <Container>
    { isLoading ? 
        <AnimatedLottieView 
          source={require('@assets/lottie/cat-loading.json')}
          style={{
            width: RFPercentage(40),
          }}
          autoPlay
          loop
          speed={2}
        />
      : emptyProfileList ? 
        <AnimatedLottieView
          source={require('@assets/lottie/cat-in-box.json')}
          style={{
            width: RFPercentage(40),
          }}
          autoPlay
          loop
          speed={0.5}
        />
      : <Swiper
          ref={swiperRef}
          cards={petProfiles}
          verticalSwipe={false}
          cardIndex={currentProfileIndex}
          onSwiped={() => changeCurrentProfileIndex(currentProfileIndex + 1)}
          onSwipedLeft={handleRejectProfile}
          onSwipedRight={handleLikeProfile}
          onTapCard={() => naviteToProfile(currentProfileIndex)}
          stackSize={5}
          animateCardOpacity
          backgroundColor='transparent'
          overlayLabels={swiperOverlayLabels}
          renderCard={(profile) => {
            return (
              <Card>
                <Photo source={{ uri: profile.photo }} />
                <Content>
                  <Name>{profile.name}</Name>
                  <Location>{
                    scope === 'all' ? 
                      profile.state 
                    : scope === 'state' ?
                      profile.city
                    : calculateFullAge(profile.birth_date)
                  }</Location>
                </Content>
              </Card>
            )
          }}
        />
    
    }
    </Container>
  )
}