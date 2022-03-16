import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Dimensions } from 'react-native'

import { Container as ContainerRef } from '@components/Container'
import { Input } from '@components/Input'

const { width } = Dimensions.get('window')

export const Container = styled(ContainerRef)`
  padding: 0;
`

export const Title = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(30)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
`

export const Profiles = styled.View`
  flex: 1;
  padding-top: 20px;
`

export const AddProfileButton = styled.TouchableOpacity`
  height: ${RFValue(100)}px;
  width: ${RFValue(100)}px;

  border-radius: 50px;
  align-items: center;
  justify-content: center;

  border: #0004;
`
export const Image = styled.Image.attrs({
  resizeMode: 'cover'
})`
  height: ${RFValue(350)}px;
  width: ${width}px;
`

export const Form = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  margin-top: -30px;

  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  padding: 24px;
`; 

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const InfoRowField = styled.View`
  height: 55px;
  width: 49%;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.GRADIENT[0]};

  border-radius: 10px;
`

export const Info = styled.Text`
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