import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { SignInScreenProps } from 'src/types/routes'
import { useAuth } from '../../hooks/auth'

import { Container } from '@components/Container'
import { Button } from '@components/Button'

import {
  Header,
  Title,
  Footer,
  SubTitle,
  SubTitleLine,
  SubTitleText
} from './styles'

export function SignIn({ navigation: { navigate } } : SignInScreenProps){

  const { signInWithGoogle } = useAuth()

  return (
    <Container>
      <Header>
        <Title>tindog</Title>
        <AnimatedLottieView
          source={require('@assets/lottie/cat.json')}
          style={{
            width: RFPercentage(55),
          }}
          autoPlay
          loop
        />
      </Header>
      <Footer>
        <SubTitle>
          <SubTitleLine />
          <SubTitleText>opções de login</SubTitleText>
          <SubTitleLine />
        </SubTitle>
        <Button 
          title='Google'
          icon='google'
          onPress={signInWithGoogle}
        />
        <Button 
          title='Número de telefone'
          icon='phone'
          onPress={() => navigate('phone')}
        />
      </Footer>
    </Container>
  )
}