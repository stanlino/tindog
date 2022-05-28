import { Input } from '@components/Input'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  padding: 0;
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
`

export const Row = styled.View`
  flex-direction: row;
  margin: 10px;
`

export const BirthDate = styled.Text`
  text-align: left;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.REGULAR};
    color: ${COLORS.TEXT};
  `}
  font-size: ${RFValue(16)}px;
`

export const Name = styled.Text`
  text-align: left;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.BOLD};
    color: ${COLORS.TITLE};
  `}
  font-size: ${RFValue(22)}px;
  margin: 5px 0px;
`

export const Wrapper = styled.View`
  flex: 1;
  background-color: #0002;
  border-radius: 10px;
  margin-bottom: 10px;
  margin: 10px;
  min-height: 100px;
`

export const Description = styled.Text`
  padding: 15px;
  font-size: ${RFValue(15)}px;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.REGULAR};
    color: ${COLORS.TEXT};
  `}
`

export const TextArea = styled(Input).attrs({
  multiline: true,
  textAlignVertical: 'top' 
})`
  min-height: 100px;
  max-height: 100%;
  justify-content: flex-start;
  padding: 15px;
  font-size: ${RFValue(15)}px;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.REGULAR};
    color: ${COLORS.TEXT};
  `}
  font-weight: 400;
`