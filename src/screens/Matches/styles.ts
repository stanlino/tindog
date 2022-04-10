import styled, { css } from "styled-components/native"
import { RFValue } from "react-native-responsive-fontsize"
import { Dimensions } from "react-native"

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const Title = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.SHAPE};
    font-size: ${RFValue(30)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
`

export const TopDetail = styled.View`
  width: ${screenWidth}px;
  height: ${screenHeight * .35}px;

  top: 0px;
  left: 0px;

  position: absolute;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`

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
  padding-top: 10px;
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
    color: ${theme.COLORS.PRIMARY};
    font-size: ${RFValue(15)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
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