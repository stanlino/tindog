import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Container = styled.TextInput`
  flex: 1;
  max-height: 55px;
  min-height: 55px;
  
  border-radius: 8px;

  font-size: ${RFValue(20)}px;
  
  ${({ theme, editable }) => css`
    font-family: ${editable ? theme.FONTS.REGULAR : theme.FONTS.BOLD};
    color: ${theme.COLORS.TEXT};
    background-color: ${editable ? `#0002` : `#0000`};
    padding-left: ${editable ? RFValue(15) : `0`}px;
  `};
`

