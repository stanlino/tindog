import React, { useState } from 'react'
import AnimatedLottieView from "lottie-react-native";
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Alert } from 'react-native'

import { useAuth } from '../../hooks/auth'

import { Container } from '@components/Container'
import { Button } from '@components/Button'

import {
  Header,
  Title,
  Footer,
  SubTitle,
} from './styles'

export function SignIn(){

  const [loading, setLoading] = useState(false)

  const { signInWithGoogle } = useAuth()

  async function handleSignInWithGoogle() {
    setLoading(true)
    const signIn = await signInWithGoogle()
    if (!signIn) {
      setLoading(false)
      Alert.alert('Ops', 'Houve um erro ao realizer login com o google, cheque a conexão com a internet!')
    }
  }

  return (
    <Container>
      <Title>tindog</Title>
      <Header>
        <AnimatedLottieView
          source={require('@assets/lottie/dog-love.json')}
          style={{
            width: RFPercentage(50),
          }}
          speed={0.9}
          autoPlay
          loop
        />
      </Header>
      <Footer>
        <SubTitle>Faça login com sua conta google!</SubTitle>
        <Button 
          title='Entrar'
          loading={loading}
          onPress={handleSignInWithGoogle}
        />
      </Footer>
    </Container>
  )
}