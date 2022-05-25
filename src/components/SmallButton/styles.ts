import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { darken } from 'polished'
import { MotiView } from 'moti'

const buttonSize = RFValue(60)

interface ButtonProps {
  color: string
}

export const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  height: ${buttonSize}px; 
  width: ${buttonSize}px;
`

export const Container = styled(MotiView)<ButtonProps>`
  min-height: ${buttonSize * 0.9}px;
  min-width: ${buttonSize}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ color }) => darken(0.05, color)};

  position: absolute;

  z-index: 2;
`

export const Bottom = styled.View<ButtonProps>`
  height: 50%;
  background-color: ${({ color }) => darken(0.1, color)};
  width: 100%;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  position: absolute;
  bottom: 0;
`