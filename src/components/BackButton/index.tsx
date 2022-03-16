import React from 'react'
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Icon
} from './styles'

interface BackButtonProps extends TouchableOpacityProps {
  action(): void
  close?: boolean
}

export function BackButton({ action, close = false, ...rest } : BackButtonProps){
  return (
    <Container {...rest} onPress={action}>
      <Icon name={close ? "caret-down-sharp" : "caret-back"} size={40} color="black" />
    </Container>
  )
}