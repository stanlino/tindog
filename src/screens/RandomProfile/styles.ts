import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const Image = styled.Image.attrs({
  resizeMode: 'cover'
})`
  width: ${screenWidth - 48}px;
  height: ${screenHeight * 0.55}px;

  border-radius: 10px;
`

export const ImageWrapper = styled.View`
  width: ${screenWidth - 48}px;
  height: ${screenHeight * 0.55}px;
  border-radius: 10px;
  overflow: hidden;
`

export const ProfileInfo = styled.View`
  margin-top: -60px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  flex-direction: row;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

export const ProfileName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(20)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}
`

export const ProfileAdjective = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-size: ${RFValue(20)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
`

export const Description = styled.View`
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  margin-top: 15px;
  padding: 10px;

  border-radius: 10px;
`

export const DText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-family: ${theme.FONTS.REGULAR};
  `}

  font-size: ${RFValue(16)}px;
  text-align: justify;
`

export const TopDetail = styled.View`
  width: ${screenWidth}px;
  height: ${screenHeight * .35}px;

  top: 0px;
  left: 0px;

  position: absolute;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`