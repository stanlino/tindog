import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Span = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.BOLD};
  `}
  font-size: ${RFValue(20)}px;
  text-align: center;
  margin-top: 30px;
`

