import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
`

export const Wrapper = styled.View`
  flex: 1;
  position: relative;
  align-items: center;
  justify-content: center;
`

export const Card = styled.View`
  background-color: white;
  height: 80%;
  border-radius: 10px;
  position: relative;
  margin-top: -60px;
`

export const Photo = styled.Image.attrs({
  resizeMode: 'cover'
})`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`

export const Content = styled.View`
  position: absolute;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  bottom: 0;
  left: 15px;
  right: 15px;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

export const Name = styled.Text`
  font-size: ${RFValue(16)}px;
  text-align: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.BOLD};
  `}
`

export const Location = styled(Name)`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-family: ${theme.FONTS.REGULAR};
  `}
`

export const Footer = styled.View`
  height: ${RFPercentage(18)}px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 25%;
  padding-right: 25%;
`

export const Span = styled.Text`
  text-align: center;
  font-size: ${RFValue(16)}px;
  color: #0006;
  width: 100%;
`