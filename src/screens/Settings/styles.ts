import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Container as TrueContainer } from '@components/Container'

export const Wrapper = styled.View`
  flex: 1;
  padding-top: ${RFValue(10)}px;

  background-color: #0003;
`

export const Container = styled(TrueContainer)`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  padding-top: 20px;
`

export const Title = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(20)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
`

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
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