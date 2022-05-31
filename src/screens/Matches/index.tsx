import React from 'react'
import { FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
const AnimatedLottieView = require("lottie-react-native");
import I18n from 'i18n-js';
import { RFPercentage } from 'react-native-responsive-fontsize'

import { useMatch } from '../../hooks/match';

import { Profile } from './components/profile'
import { MatchesScreenProps } from 'src/types/routes';

import { 
  Container,
  Header,
  BackButton,
  Title,
  Content,
  Output,
  Span
} from './styles'

export function Matches({ navigation: { goBack } } : MatchesScreenProps){

  const { matchs } = useMatch()

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Feather name="arrow-left" size={30} color="#594D4D" />
        </BackButton>
        <Title>{I18n.t('matches_title')}</Title>
      </Header>
      <FlatList 
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 80
        }}
        data={matchs}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item, index }) => <Profile item={item} index={index} />}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
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
                {I18n.t('no_have_matches')}
              </Output>
              <Span>{I18n.t('matches_span')}</Span>
            </Content>
          )
        }}
      />
    </Container>
  )
}