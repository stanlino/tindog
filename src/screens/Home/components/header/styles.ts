import { StatusBar } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${StatusBar.currentHeight}px;
  height: ${RFPercentage(12)}px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`

type TouchableOpacityProps = {
  color: string
}

export const TouchableOpacity = styled.TouchableOpacity<TouchableOpacityProps>`
  height: ${RFValue(55)}px;
  width: ${RFValue(55)}px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ color }) => color};
  border-radius: 10px;
`