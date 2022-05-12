import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`

  flex: 1;

  padding: 20px;

  background-color: #dbe9f4;
`

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

export const UserLocation = styled.Text`
  text-align: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}
  margin-top: 10px;
`