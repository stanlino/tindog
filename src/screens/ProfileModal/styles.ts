import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Dimensions } from 'react-native'

import { Container as TrueContainer } from '@components/Container'
import { Input } from '@components/Input'

const { width } = Dimensions.get('window')

export const Container = styled(TrueContainer)`
  padding: 0;
  margin-top: ${RFValue(20)}px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  overflow: hidden;
`

export const Image = styled.Image.attrs({
  resizeMode: 'cover'
})`
  height: ${RFValue(350)}px;
  width: ${width}px;
`

export const Content = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  margin-top: -30px;
  padding: 24px;
`; 

export const Row = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`

export const Touchable = styled.TouchableOpacity`
  width: 49%;
  height: 55px;

  align-items: center;
  justify-content: center;

  border-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-width: 1px;
  border-radius: 10px;
`

export const TouchableText = styled.Text`
  text-align: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(20)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}
`

export const Label = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.FONTS.LIGHT};
  `}
  margin-top: 15px;
  margin-bottom: 5px;
`

export const TextArea = styled(Input)`
  min-height: 150px;

  justify-content: flex-start;

  padding: 20px;
`
