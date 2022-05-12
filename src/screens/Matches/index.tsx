import React from 'react'
import { FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
const AnimatedLottieView = require("lottie-react-native");
import { RFPercentage } from 'react-native-responsive-fontsize'

import { useMatch } from '../../hooks/match';

import { Profile } from './components/petProfile'
import { MatchesScreenProps } from 'src/types/routes';

import { 
  Container,
  Header,
  BackButton,
  Title,
  Content,
  Output
} from './styles'

export function Matches({ navigation: { goBack } } : MatchesScreenProps){

  const { matchs } = useMatch()

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Feather name="arrow-left" size={30} color="white" />
        </BackButton>
        <Title>Combinações</Title>
      </Header>
      <FlatList 
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 80
        }}
        data={matchs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Profile item={item} />}
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
                Ainda não há combinações
              </Output>
            </Content>
          )
        }}
      />
    </Container>
  )
}