import { RFValue } from "react-native-responsive-fontsize"
import styled, { css } from "styled-components/native"

export const MatchView = styled.View`
  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  overflow: hidden;

  flex-direction: row;
  border-radius: 10px;

  margin-bottom: 10px;
`

export const Avatar = styled.Image`
  height: ${RFValue(100)}px;
  width: ${RFValue(100)}px;
  margin-right: 15px;
`

export const Side = styled.View`
  flex: 1;

  justify-content: center;
`

export const Name = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(30)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}
`

export const Adjective = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-size: ${RFValue(15)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
`

export const Touchable = styled.TouchableOpacity`
  width: ${RFValue(60)}px;
  height: 100%;
  background-color: #0001;

  justify-content: center;
  align-items: center;
`