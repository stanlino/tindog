import styled, { css } from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${RFPercentage(8)}px;
  background-color: ${({ theme, disabled }) => disabled ? '#0003' : '#333b89'};
  
  border-radius: 8px;

  justify-content: center;
  align-items: center;
  flex-direction: row;

  padding-left: 20px;
  padding-right: 20px;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.SHAPE};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.FONTS.BOLD};
    text-align: center;
    flex: 1
  `}
`