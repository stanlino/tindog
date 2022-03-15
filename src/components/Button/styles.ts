import styled, { css } from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Container = styled(RectButton)`
  width: 100%;
  height: ${RFPercentage(8)}px;
  background-color: ${({ theme }) => theme.COLORS.GRADIENT[0]};
  
  border-radius: 8px;

  justify-content: center;
  align-items: center;
  flex-direction: row;

  padding-left: 20px;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.FONTS.BOLD};
    text-align: center;
    flex: 1
  `}
`