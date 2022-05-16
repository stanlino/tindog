import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

export const Container = styled.View`
  flex: 1;
`

export const Photo = styled.Image.attrs({
  resizeMode: 'cover'
})`
  height: 100%;
`

export const Touchable = styled.TouchableOpacity`
  position: absolute;
  height: 60px;
  width: 60px;
  border-radius: 10px;
  background-color: #0002;
  align-items: center;
  justify-content: center;
  margin: 10px;
  right: 0;
`

export const Content = styled.View`
  position: absolute;
  background-color: #fff;
  width: ${screenWidth - 20}px;
  min-height: ${screenHeight / 4}px;
  bottom: 10px;
  left: 10px;
  right: 10px;
  border-radius: 10px;
  padding: 10px;
`

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #0003;
  padding-bottom: 5px;
  margin-bottom: 5px;
  justify-content: space-between;
`;

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

export const Description = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-family: ${theme.FONTS.REGULAR};
  `}

  font-size: ${RFValue(15)}px;
`
