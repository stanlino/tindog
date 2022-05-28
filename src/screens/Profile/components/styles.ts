import { Dimensions, StatusBar } from "react-native";
import styled, { css } from "styled-components/native";
import FastImage from "react-native-fast-image";

import Waves from '@assets/svg/waves.svg'

const { width } = Dimensions.get('window')

export const ImageWrapper = styled.View``

export const Image = styled(FastImage).attrs({
  resizeMode: 'cover'
})`
  width: ${width}px;
`

export const WavesSvg = styled(Waves).attrs({
  width,
  height: 50
})`
  position: absolute; 
  top: ${width * 1.3}px;
`

export const Head = styled.View`
  position: absolute;
  top: ${StatusBar.currentHeight}px;
  padding: 10px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

export const Button = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-radius: 10px;
  background-color: #0005;
  align-items: center;
  justify-content: center;
`