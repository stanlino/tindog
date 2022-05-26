import styled, { css } from "styled-components/native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
` 

export const Middle = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  text-align: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(30)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
`

export const Footer = styled.View`
  align-items: center;
  justify-content: center;
`

export const Span = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}
  text-align: center;
  margin: 20px 5px;
`

export const Background = styled.View`
  width: ${RFPercentage(45)}px;
  aspect-ratio: 1;
  background-color: white;
  border-radius: ${RFPercentage(50)/2}px;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
`