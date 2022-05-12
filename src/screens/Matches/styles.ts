import styled, { css } from "styled-components/native"
import { RFValue } from "react-native-responsive-fontsize"
import { StatusBar } from "react-native"

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: #dbe9f4;
`

export const Header = styled.View`
  margin-top: ${StatusBar.currentHeight}px;
  padding: 10px 0;
  flex-direction: row;
  align-items: center;
`

export const Title = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(26)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}
`

export const BackButton = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-radius: 10px;
  background-color: #0004;
  align-items: center;
  justify-content: center;
  right: ${RFValue(10)}px;
`

export const Content = styled.View`
  flex: 1;
  padding-top: 50px;
  align-items: center;
`

export const Output = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.BOLD};
  `}
  font-size: ${RFValue(20)}px;
  text-align: center;
  margin-top: 30px;
`