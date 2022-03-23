import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Dimensions } from 'react-native'

import { Container as ContainerRef } from '@components/Container'
import { Input } from '@components/Input'

const { width } = Dimensions.get('window')

export const Container = styled(ContainerRef)`
  padding: 0;
`

export const Image = styled.Image.attrs({
  resizeMode: 'cover'
})`
  height: ${RFValue(350)}px;
  width: ${width}px;
`

export const Name = styled.TextInput.attrs({
  placeholder: 'nome'
})`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(30)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
  padding: 0 ${RFValue(24)}px;
  width: 100%;
  position: absolute;
  top: ${RFValue(270)}px;
`

export const SettingsButton = styled.TouchableOpacity`
  position: absolute;
  top: ${RFValue(40)}px;
  right: ${RFValue(20)}px;
`

export const Form = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  margin-top: -30px;

  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  padding: 24px;
`; 

export const Row = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`

export const Field = styled.TouchableOpacity`
  flex: 1;
  min-height: 55px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.GRADIENT[0]};

  border-radius: 10px;
`

export const FieldValue = styled.Text`
  text-align: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(20)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}
`

export const TextInputField = styled.TextInput.attrs({
  maxLength: 4,
  keyboardType: 'number-pad',
  placeholder: '2020'
})`
  flex: 1;
  min-height: 55px;

  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(20)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}

  text-align: center;

  background-color: ${({ theme }) => theme.COLORS.GRADIENT[0]};

  border-radius: 10px;
`

export const Separator = styled.View`
  width: 10px;
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

export const TextArea = styled(Input).attrs({
  multiline: true,
})`
  min-height: 150px;
  max-height: 150px;
  margin-bottom: 15px;

  justify-content: flex-start;
  
  text-align-vertical: top;

  padding: 20px;
`