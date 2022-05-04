import styled, { css } from "styled-components/native"
import { RFValue } from "react-native-responsive-fontsize"

export const Header = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
` 

export const Title = styled.Text`
  text-align: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(50)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
`

export const Footer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const SubTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(15)}px;
    font-family: ${theme.FONTS.LIGHT};
  `}
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 20px;
`

export const Warning = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}
  text-align: justify;
  margin-top: 20px;
`