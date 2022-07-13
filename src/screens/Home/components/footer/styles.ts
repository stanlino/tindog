import styled, { css } from "styled-components/native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

export const Container = styled.View`
  height: ${RFPercentage(18)}px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 10%;
  padding-right: 10%;
`

export const Span = styled.Text`
  text-align: center;
  font-size: ${RFValue(16)}px;
  color: #0006;
  width: 100%;
  padding: 0 10%;
`

export const Box = styled.View`
  flex: 1;
`

export const InvisibleTouchable = styled.TouchableOpacity`
  height: 40px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export const Link = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONTS.REGULAR};
  `}
  color: purple;
  font-size: ${RFValue(15)}px;
  text-align: center;
  margin-left: 5px;
`

export const RoundTouchable = styled.TouchableOpacity`
  height: ${RFValue(40)}px;
  width: ${RFValue(40)}px;

  background: #0002;

  align-items: center;
  justify-content: center;

  border-radius: 25px;
`