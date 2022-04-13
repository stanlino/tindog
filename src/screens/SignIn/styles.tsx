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
  justify-content: space-between;
`

export const SubTitle = styled.View`
  flex-direction: row;
  align-items: center;
`

export const SubTitleLine = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.COLORS.TITLE};
    height: .5px;
    flex: 1;
  `}
`

export const SubTitleText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(15)}px;
    font-family: ${theme.FONTS.LIGHT};
  `}
  margin-left: 5px;
  margin-right: 5px;
`

export const Form = styled.View`
  flex: 1;
  padding-top: ${RFValue(50)}px;
`

export const Label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.FONTS.LIGHT};
    margin-bottom: 10px;
  `}
`

export const TextInputWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

export const DDI = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(20)}px;
    font-family: ${theme.FONTS.BOLD};
    margin-right: 10px;
  `}
`