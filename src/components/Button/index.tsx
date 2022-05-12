import React from 'react'
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Title
} from './styles'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  loading?: boolean
}

export function Button({
  title,
  loading = false,
  ...rest
} : ButtonProps){
  return (
    <Container disabled={loading} {...rest}>
      <Title numberOfLines={1} adjustsFontSizeToFit>
        {loading ? 'Carregando ...' : title}
      </Title>
    </Container>
  )
}