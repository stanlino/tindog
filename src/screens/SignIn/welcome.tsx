import React from 'react'
const AnimatedLottieView = require('lottie-react-native')
import { RFPercentage } from 'react-native-responsive-fontsize'

import { Container } from '@components/Container'
import { Button } from '@components/Button'

import { WelcomeScreenProps } from 'src/types/routes'

import { 
  Warning,
  Title, 
  Header
} from './styles'

export function Welcome({ navigation } : WelcomeScreenProps){
  return (
    <Container>
      <Title>Atenção!</Title>
      <Warning>
        Este é um app em fase de testes!  
        Pode ser que você encontre algumas 
        coisas fora do lugar.
      </Warning>
      <Header>
        <AnimatedLottieView 
          source={require('@assets/lottie/maintenance.json')}
          style={{
            width: RFPercentage(50),
          }}
          speed={0.9}
          autoPlay
          loop
        />
      </Header>
      <Button title="Vamos nessa!" onPress={() => navigation.navigate('index')} />
    </Container>
  )
}