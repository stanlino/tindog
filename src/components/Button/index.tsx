import React from 'react'
import { TouchableOpacityProps } from 'react-native';
import { useAnimationState } from 'moti'
import { RFPercentage } from 'react-native-responsive-fontsize';

import {
  Bottom,
  Container,
  Title,
  Wrapper
} from './styles'
import I18n from 'i18n-js';

interface ButtonProps extends TouchableOpacityProps {
  title: string
  loading?: boolean
  disabled?: boolean
}

const ButtonHeight = RFPercentage(8)

export function Button({
  title,
  loading = false,
  disabled = false,
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
      disabled={loading || disabled}
      onPressIn={() => animateButton('pressIn')} 
      delayPressOut={1}
      onPressOut={() => animateButton('pressOut')} 
      {...rest}
    >
      <Wrapper 
        state={buttonAnimation} 
        disabled={loading || disabled}
      >
        <Title numberOfLines={1} adjustsFontSizeToFit>
          {loading ? I18n.t('loading') : title}
        </Title>
      </Wrapper>
      <Bottom disabled={loading || disabled} />
    </Container>
  )
}