import { useAnimationState } from 'moti'
import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import {
  Bottom,
  Container,
  Touchable
} from './styles'

interface SmallButtonProps extends TouchableOpacityProps {
  color: string
}

const buttonSize = RFValue(60)

export function SmallButton({ children, color, ...rest } : SmallButtonProps){

  const buttonAnimation = useAnimationState({
    pressIn: {
      transform: [{ translateY: buttonSize * 0.1 }]
    },
    pressOut: {
      transform: [{ translateY: 0 }]
    }
  })

  function animateButton(state: 'pressIn' | 'pressOut') {
    buttonAnimation.transitionTo(state)
  }

  return (
    <Touchable 
      onPressIn={() => animateButton('pressIn')} 
      delayPressOut={1}
      onPressOut={() => animateButton('pressOut')}
      {...rest}
    >
      <Container  
        color={color} 
        state={buttonAnimation}
      >
        {children}
      </Container>
      <Bottom color={color} />
    </Touchable>
  )
}