import React, { useRef, useState } from 'react'
import Swiper from 'react-native-deck-swiper'

import { Container } from '@components/Container'

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
} from './styles'

export function Home(){

  const [currentIndex, setCurrentIndex] = useState(0)
  const swiperRef = useRef<any>()

  function handleSwipeToLeft() {
    swiperRef.current.swipeLeft()
  }

  function handleSwipeToRight() {
    swiperRef.current.swipeRight()
  }

  return (
    <Container>
      <Title>tindog</Title>
      <Profiles>
        <Swiper 
          ref={swiperRef}
          cards={[0,1,2,3,4]}
          keyExtractor={card => String(card)}
          verticalSwipe={false}
          cardIndex={currentIndex}
          onSwiped={() => setCurrentIndex(index => index + 1)}
          stackSize={4}
          stackScale={10}
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          backgroundColor='transparent'
          renderCard={(card) => {
            return (
              <Profile>
                <ProfileImage source={{ uri: 'https://static1.patasdacasa.com.br/articles/7/44/7/@/1498-algumas-racas-de-cachorro-sao-mais-indep-opengraph_1200-1.jpg' }} />
                <ProfileInfo>
                  <ProfileName>Jonh Doe</ProfileName>
                  <ProfileAdjective>Amigável</ProfileAdjective>
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