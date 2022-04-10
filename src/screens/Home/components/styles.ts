import { Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import styled, { css } from "styled-components/native"

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const Title = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.SHAPE};
    font-size: ${RFValue(35)}px;
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

export const Content = styled.View`
  flex: 1;
  padding-top: 50px;
  align-items: center;
`

export const NoHaveMoreProfiles = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.BOLD};
  `}
  font-size: ${RFValue(20)}px;
  text-align: center;
  margin-top: 30px;
`
