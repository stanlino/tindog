import styled, { css } from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { TouchableOpacityProps } from 'react-native';
import { MotiView } from 'moti';

const ButtonHeight = RFValue(60)

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  flex: 1;
  height: ${ButtonHeight}px;
`

export const Wrapper = styled(MotiView)<TouchableOpacityProps>`
  height: ${ButtonHeight * 0.9}px;
  width: 100%;
  background-color: ${({ theme, disabled }) => disabled ? '#a3a3a3' : '#333b89'};
  
  border-radius: 8px;

  position: absolute;
  z-index: 2;

  justify-content: center;
  align-items: center;
  flex-direction: row;

  padding-left: 20px;
  padding-right: 20px;
`

export const Bottom = styled.View<TouchableOpacityProps>`
  height: ${ButtonHeight/2}px;
  width: 100%;
  align-self: center;
  background-color: ${({ theme, disabled }) => disabled ? '#6e6e6e' : '#1a2269'};
  position: absolute;
  bottom: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.SHAPE};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.FONTS.BOLD};
    text-align: center;
  `}
`