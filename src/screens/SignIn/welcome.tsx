import React from 'react'
const AnimatedLottieView = require('lottie-react-native')
import { RFPercentage } from 'react-native-responsive-fontsize'

import { Container } from '@components/Container'
import { Button } from '@components/Button'

import { WelcomeScreenProps } from 'src/types/routes'

import { 
  Span,
  Title, 
  Wrapper,
} from './styles'

export function Welcome({ navigation } : WelcomeScreenProps){
  return (
    <Container>
      <Wrapper>
        <Title>Olá</Title>
        <Span>
          Todo mundo merece um love e seu bixano mais do que ninguém! Seja bem vindo ao Tindog!
        </Span>
        <Wrapper>
          <AnimatedLottieView 
            source={require('@assets/lottie/cat-love.json')}
            style={{
              width: RFPercentage(40),
            }}
            speed={0.5}
            autoPlay
            loop
          />
        </Wrapper>
      </Wrapper>
      <Button title="Avançar" onPress={() => navigation.navigate('index')} />
    </Container>
  )
}