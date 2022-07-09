import { Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

const { width: screenWidth } = Dimensions.get('screen')

export const ContainerModal = styled.View`
  flex: 1;
  background-color: #fff6; 
  align-items: center; 
  justify-content: center;
`

export const ContentModal = styled.View`
  width: ${screenWidth}px;
  justify-content: center; 
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
`

export const Content = styled.View`
  background-color: #dbe9f4;
  padding: 20px 10px;
  border-radius: 4px;
`

export const ContentText = styled.Text`
  font-size: ${RFValue(16)}px;
  text-align: center;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`

export const ContentTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONTS.BOLD};
    color: ${theme.COLORS.TITLE};
  `}
  font-size: ${RFValue(18)}px;
  text-align: center;
`

export const Row = styled.View`
  width: 100%; 
  flex-direction: row; 
  justify-content: flex-end; 
  margin-top: 20px;
  padding-right: 2px;
`