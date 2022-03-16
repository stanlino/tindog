import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Container = styled.TextInput`
  flex: 1;
  max-height: 55px;
  min-height: 55px;
  
  border-radius: 8px;

  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(20)}px;

  padding-left: ${RFValue(20)}px;
  padding-right: ${RFValue(20)}px;

  border: 1px solid #0003;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.REGULAR};
    color: ${theme.COLORS.TEXT};
  `};
`

