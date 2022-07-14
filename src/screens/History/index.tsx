import React, { useCallback, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import I18n from 'i18n-js';
import { FlatList, StatusBar } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { Pet, usePet } from '@hooks/pet_document'
import { HistoryScreenProps } from '@types_/routes'

import { SmallButton } from '@components/SmallButton'
import { getVisualizedProfiles } from './utils/firestore';

import { Profile } from './profile';


import { 
  Container, 
  Content, 
  Output, 
  Row,
  Span,
  Title,
  Warning,
  Wrapper
} from './styles'

export function History({ navigation } : HistoryScreenProps){

  const { visualizedProfiles } = usePet()

  const [ profiles, setProfiles ] = useState<Pet[]>([])

  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {

    async function getProfiles() {
      const recoveredProfiles = await getVisualizedProfiles(visualizedProfiles)

      setProfiles(recoveredProfiles)

      setIsLoading(false)
    }

    getProfiles()

  },[])

  const navigateToProfile = useCallback((pet: Pet) => {
    navigation.navigate('presentation', {
      pet: pet,
      itsAMatch: false
    })
  },[])

  const getInteraction = useCallback((pet_id: string) => {
    const profile = visualizedProfiles.filter(item => item.pet_id === pet_id)

    return profile[0].type_of_interaction
  },[])

  return (
    <Container>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={'#0000'}/>

      <Row>
        <Title>{I18n.t('history_screen_title')}</Title>
        <SmallButton color='#dbe9f4' onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color="#000" />
        </SmallButton>
      </Row>

      {profiles.length > 0 && <Span>{I18n.t('history_screen_span')}</Span>}

      <Wrapper>
        { isLoading ?
            <AnimatedLottieView
              source={require('@assets/lottie/cat-loading.json')}
              style={{
                width: RFPercentage(40),
                alignSelf: 'center'
              }}
              autoPlay
              loop
              speed={2}
            />
          : <FlatList 
              data={profiles}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => 
                <Profile 
                  navigateToProfile={navigateToProfile} 
                  item={item} 
                  index={index} 
                  interaction={getInteraction(item.id)}
                />
              }
              ListEmptyComponent={() => {
                return (
                  <Content>
                    <AnimatedLottieView
                      source={require('@assets/lottie/dog-sleeping.json')}
                      style={{
                        width: RFPercentage(40),
                      }}
                      autoPlay
                      loop
                      speed={0.5}
                    />
                    <Output>
                      {I18n.t('history_screen_warning_title')}
                    </Output>
                    <Warning>{I18n.t('history_screen_warning_span')}</Warning>
                  </Content>
                )
              }}
            />
        }
      </Wrapper>
    </Container>
  )
}