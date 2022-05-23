import FastImage from "react-native-fast-image"
import { RFValue } from "react-native-responsive-fontsize"
import styled, { css } from "styled-components/native"

export const MatchView = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  flex: .49;

  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  overflow: hidden;

  border-radius: 10px;

  margin-bottom: 10px;
`

export const Avatar = styled(FastImage).attrs({resizeMode: 'cover'})`
  height: 100%;
`

export const Bellow = styled.View`
  justify-content: center;
  position: absolute;
  background-color: white;
  width: 100%;
  bottom: 0;
  padding: 5px 0px;
`

export const Name = styled.Text`
  text-align: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(16)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}
`