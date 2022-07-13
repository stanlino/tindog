import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONTS.BOLD};
    color: ${theme.COLORS.TITLE};
  `}
  font-size: ${RFValue(18)}px;
  text-align: center;
  margin-bottom: 20px;
`

export const Option = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`

export const Text = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONTS.REGULAR};
    color: ${theme.COLORS.TITLE};
  `}
  font-size: ${RFValue(15)}px;
  text-align: center;
`