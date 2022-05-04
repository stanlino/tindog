import { Dimensions, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import FastImage from "react-native-fast-image";

import Waves from '@assets/svg/waves.svg'

const { width } = Dimensions.get('window')

import { Input } from '@components/Input'

// header

export const ImageWrapper = styled.View``

export const Image = styled(FastImage).attrs({
  resizeMode: 'cover'
})`
  height: ${RFValue(350)}px;
  width: ${width}px;
`

export const WavesSvg = styled(Waves).attrs({
  width,
  height: 50
})`
  position: absolute; 
  top: ${RFValue(310)}px;
`

export const PickImageView = styled.TouchableOpacity`
  height: ${RFValue(350)}px;
  width: ${width}px;

  align-items: center;
  justify-content: center;
`;

export const ButtonsBackground = styled.View`
  position: absolute;
  top: ${StatusBar.currentHeight! + RFValue(20)}px;
  right: ${RFValue(10)}px;
  
  justify-content: space-between;

  background-color: #0005;
  padding: 10px;

  border-radius: 10px;
`

// form

export const Container = styled.View`
  flex: 1;

  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  padding: 24px;
`; 

export const Row = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`

export const Touchable = styled.TouchableOpacity`
  width: 49%;
  height: 55px;

  align-items: center;
  justify-content: center;

  border-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-width: 1px;
  border-radius: 10px;
`

export const TouchableText = styled.Text`
  text-align: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(20)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}
`

export const Label = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.FONTS.LIGHT};
  `}
  margin-top: 15px;
  margin-bottom: 5px;
`

export const TextArea = styled(Input)`
  min-height: 150px;

  justify-content: flex-start;

  padding: 20px;
`

// textInput

export const Error = styled.Text`
  text-align: justify;
  margin-top: 5px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.BOLD};
  `}
  color: red;
  font-size: ${RFValue(15)}px;
`