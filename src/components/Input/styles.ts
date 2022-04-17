import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Container = styled.TextInput`
  flex: 1;
  max-height: 55px;
  min-height: 55px;
  
  border-radius: 8px;

  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(20)}px;

  padding-right: ${RFValue(20)}px;

  ${({ theme, editable }) => css`
    font-family: ${editable ? theme.FONTS.REGULAR : theme.FONTS.BOLD};
    color: ${theme.COLORS.TEXT};
    border: ${editable ? `1px solid #0003` : `0px`};
    padding-left: ${editable ? RFValue(20) : `0`}px;
  `};
`

