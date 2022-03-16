import styled, { css } from "styled-components/native"
import { RFValue } from "react-native-responsive-fontsize"

export const Title = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(30)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
`
export const MatchView = styled.View`
  border: 1px solid #0004;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  border-radius: 10px;

  margin-bottom: 10px;
`

export const Avatar = styled.Image`
  height: ${RFValue(80)}px;
  width: ${RFValue(80)}px;

  border-radius: 40px;
  margin-right: 15px;
`

export const Side = styled.View`
  flex: 1;
`

export const Name = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(20)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}
`

export const Touchable = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
`

export const Text = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(15)}px;
    font-family: ${theme.FONTS.LIGHT};
  `}
`
