import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Dimensions } from 'react-native'

const { width: windowWidth } = Dimensions.get('window')

export const Wrapper = styled.View`
  flex: 1;
`

export const Title = styled.Text`
  text-align: left;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.REGULAR};
    color: ${COLORS.TITLE};
  `}
  font-size: ${RFValue(16)}px;
  text-transform: capitalize;
`
export const StepIndicatorWrapper = styled.View`
  width: ${windowWidth - 24}px;
  align-self: center;
  margin: 10px 0px;
`
export const ProgressItem = styled.View`
  align-items: center;
  justify-content: center;
`

export const Body = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Footer = styled.View`
  flex-direction: row;
`

export const Flex = styled.View`
  width: 10px;
`