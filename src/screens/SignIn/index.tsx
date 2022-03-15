import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { Container } from '@components/Container'
import {
  Header,
  Title,
  Footer,
  SubTitle,
  SubTitleLine,
  SubTitleText
} from './styles'
import { Button } from '@components/Button'

export function SignIn(){
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
        />
        <Button 
          title='Número de telefone'
          icon='phone'
        />
      </Footer>
    </Container>
  )
}