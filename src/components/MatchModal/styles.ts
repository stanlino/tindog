import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export const Container = styled.View`
  flex: 1;
  background-color: #0000;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  text-align: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(35)}px;
    font-family: ${theme.FONTS.BOLD};
  `}

  margin-bottom: 20px;
`

export const Touchable = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  padding: 10px 20px;
  border-radius: 10px;
`

export const TouchableText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-size: ${RFValue(20)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
`

export const Row = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 20px;
`

export const Pet = styled.View`
  align-items: center;
`

export const PetImage = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;

  border-radius: ${RFValue(40)}px;
`

export const PetName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${RFValue(15)}px;
    font-family: ${theme.FONTS.BOLD};
  `}

  margin-top: 10px;
`

export const Match = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Icon = styled(MaterialCommunityIcons)`
  margin-left: 20px;
  margin-right: 20px;
`