import React, { useState } from 'react'
const AnimatedLottieView = require("lottie-react-native");
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Alert } from 'react-native'

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
  SubTitleText,
  Row,
  Span
} from './styles'

export function SignIn({ navigation: { navigate } } : SignInScreenProps){

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
        {loading ? (
          <Row>
            <AnimatedLottieView 
              source={require('@assets/lottie/cat-loading.json')}
              style={{
                width: RFPercentage(10),
              }}
              autoPlay
              loop
              speed={2}
            />
            <Span>Login com o google</Span>
          </Row>
        ) : (
          <>
            <SubTitle>
              <SubTitleLine />
              <SubTitleText>opções de login</SubTitleText>
              <SubTitleLine />
            </SubTitle>
            <Button 
              title='Google'
              icon='google'
              onPress={handleSignInWithGoogle}
            />
            <Button 
              title='Número de telefone'
              icon='phone'
              onPress={() => navigate('phone')}
            />
          </>
          )
        }
      </Footer>
    </Container>
  )
}