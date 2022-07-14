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
  flex: 1;
  margin: 0 10px;
`

export const Box = styled.View`
  flex: 1;
`

export const RoundTouchable = styled.TouchableOpacity`
  height: ${RFValue(40)}px;
  width: ${RFValue(40)}px;

  background: #0002;

  align-items: center;
  justify-content: center;

  border-radius: 25px;
`