import React from 'react'
import { TouchableOpacity } from 'react-native';
import { useAnimationState } from 'moti'
import { RFPercentage } from 'react-native-responsive-fontsize';

import {
  Bottom,
  Container,
  Title,
  Wrapper
} from './styles'

interface ButtonProps extends TouchableOpacity {
  title: string
  loading?: boolean
}

const ButtonHeight = RFPercentage(8)

export function Button({
  title,
  loading = false,
  ...rest
} : ButtonProps){

  const buttonAnimation = useAnimationState({
    pressIn: {
      transform: [{ translateY: ButtonHeight * 0.1 }]
    },
    pressOut: {
      transform: [{ translateY: 0 }]
    }
  })

  function animateButton(state: 'pressIn' | 'pressOut') {
    buttonAnimation.transitionTo(state)
  }

  return (
    <Container 
      disabled={loading}
      onPressIn={() => animateButton('pressIn')} 
      delayPressOut={1}
      onPressOut={() => animateButton('pressOut')} 
      {...rest}
    >
      <Wrapper 
        state={buttonAnimation} 
        disabled={loading}
      >
        <Title numberOfLines={1} adjustsFontSizeToFit>
          {loading ? 'Carregando ...' : title}
        </Title>
      </Wrapper>
      <Bottom disabled={loading} />
    </Container>
  )
}