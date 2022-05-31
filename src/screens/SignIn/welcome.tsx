import React from 'react'
const AnimatedLottieView = require('lottie-react-native')
import { RFPercentage } from 'react-native-responsive-fontsize'
import i18n from 'i18n-js';

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
        <Title>{i18n.t('salutation')}</Title>
        <Span>
          {i18n.t('welcome')}
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
      <Button title={i18n.t('next')} onPress={() => navigation.navigate('index')} />
    </Container>
  )
}