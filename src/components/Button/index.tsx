import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'; 

import {
  Container,
  Title
} from './styles'

interface ButtonProps extends RectButtonProps {
  title: string
  icon?: React.ComponentProps<typeof FontAwesome>['name']
}

export function Button({
  title,
  icon,
  ...rest
} : ButtonProps){
  return (
    <Container {...rest}>
      {icon && (
        <FontAwesome 
          size={24} 
          name={icon} 
        />
      )}
      <Title>
        {title}
      </Title>
    </Container>
  )
}