import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Wrapper = styled.View`
  flex: 1;
  padding-top: ${RFValue(20)}px;
`

export const Row = styled.View`
  margin-top: -20px;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`
export const Label = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.FONTS.LIGHT};
  `}

  margin-top: 15px;
  margin-bottom: 5px;
`

export const Form = styled.View`
  flex: 1;
`

export const Separator = styled.View`
  height: 10px;
`