import React, { 
  useCallback, 
  useState 
} from 'react'

import AnimatedLottieView from "lottie-react-native";

import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNetInfo } from '@react-native-community/netinfo';
import { Alert } from 'react-native'

import { useAuth } from '../../hooks/auth'

import { Container } from '@components/Container'
import { Button } from '@components/Button'

import {
  Wrapper,
  Title,
  Footer,
  Background
} from './styles'

export function SignIn(){

  const [loading, setLoading] = useState(false)

  const { signInWithGoogle } = useAuth()
  const { isConnected } = useNetInfo()

  const handleSignInWithGoogle = useCallback(async () => {
    setLoading(true)
    const response = await signInWithGoogle()
    if (response != 'SUCCESS') {
      setLoading(false)

      if (response === 'PLAY_SERVICES_NOT_AVAILABLE') {
        return Alert.alert(
          'Erro',
          'Este dispositivo não possui o google play services instalado!'
          )
      }

      if (response === 'UNKNOWN') {
        if (isConnected) {
          return Alert.alert('Erro', 'Houve um erro desconhecido ao fazer login com o google')
        }
        
        return Alert.alert('Erro', 'Conecte-se a internet para conseguir realizar o login com o google!')
      }
    }
  },[])

  return (
    <Container>
      <Title>tindog</Title>
      <Wrapper>
        <Background>
          <AnimatedLottieView
            source={require('@assets/lottie/dog-love.json')}
            style={{
              width: '90%',
              transform: [{ translateY: RFPercentage(2) }]
            }}
            speed={0.8}
            autoPlay
            loop
          />
        </Background>
      </Wrapper>
      <Footer>
        <Button 
          title='Entrar com Google'
          loading={loading}
          onPress={handleSignInWithGoogle}
        />
      </Footer>
    </Container>
  )
}