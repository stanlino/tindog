import { Input } from '@components/Input'
import { MotiText } from 'moti'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #dbe9f4;
`

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${RFValue(60)}px;
  margin-bottom: 10px;
`

export const Title = styled.Text`
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.REGULAR};
  `}
  font-size: ${RFValue(20)}px;
`

export const Wrapper = styled.View`
  flex: 1;
  margin-top: 10px;
`

export const Span = styled.Text`
  text-align: justify;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.REGULAR};
  `}
  font-size: ${RFValue(15)}px;
`

export const TextArea = styled(Input).attrs({
  multiline: true,
  textAlignVertical: 'top' 
})`
  min-height: 150px;
  justify-content: flex-start;
  padding: 15px;
  font-size: ${RFValue(15)}px;
  margin-top: 15px;
`

export const FeedbackSended = styled(MotiText)`
  text-align: center;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.BOLD};
  `}
  font-size: ${RFValue(15)}px;

  position: absolute;

  background-color: green;
  padding: 10px 20px;

  border-radius: 5px;
  color: white;

  bottom: 20px;
  align-self: center;
`