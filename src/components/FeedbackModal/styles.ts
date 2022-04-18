import { Input } from '@components/Input'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  flex: 1;
  background-color: #0003;
  align-items: center;
  justify-content: center;
`

export const Content = styled.View`
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 10px;
`

export const Message = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONTS.REGULAR};
    color: ${theme.COLORS.TITLE};
  `}

  font-size: ${RFValue(16)}px;
  text-align: center;
  margin-bottom: 10px;
`

export const TextArea = styled(Input)`
  margin-bottom: 10px;
  min-height: 150px;
  padding-top: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
`;