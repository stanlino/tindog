import { Input } from '@components/Input'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Title = styled.Text`
  text-align: left;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.REGULAR};
    color: ${COLORS.TITLE};
  `}
  font-size: ${RFValue(20)}px;
  margin-bottom: 10px;
`

export const ImageTouchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  flex: 1;
  border-width: 1px;
  border-style: dashed;
  border-color: #0004;
  border-radius: 10px;
  margin: 10px 0;
  align-items: center;
  justify-content: center;
`

export const Span = styled.Text`
  text-align: center;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.REGULAR};
    color: ${COLORS.TITLE};
  `}
  font-size: ${RFValue(16)}px;
  margin: 10px 20px;
`

export const SuperSpan = styled(Span)`
  font-size: ${RFValue(18)}px;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.BOLD};
    color: ${COLORS.TITLE};
  `}
`

type SmallTouchableProps = {
  selected: boolean
  center?: boolean
}

export const SmallTouchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})<SmallTouchableProps>`
  flex: 1;
  min-height: 120px;
  margin-bottom: 10px;
  background-color: ${({ selected }) => selected ? '#8089d3' : '#0002'};
  border-radius: 10px;
  align-items: center;
  justify-content: ${({ center }) => center ? 'center' : 'flex-end'};
  margin: 5px;
`

export const Row = styled.View`
  flex-direction: row;
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
  background-color: #0000;
`

export const ImagePreview = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 100%;
  aspect-ratio: ${41/57};
  border-radius: 10px;
  margin-top: 10px;
`

export const TextareaWrapper = styled.View`
  flex: 1;
  background-color: #0002;
  border-radius: 10px;
  margin-bottom: 10px;
`

export const ShortImage = styled.Image`
  width: 100%;
  aspect-ratio: ${41/57};
  border-radius: 10px;
  margin-right: 10px;
`

export const PetName = styled.Text`
  text-align: left;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.BOLD};
    color: ${COLORS.TITLE};
  `}
  font-size: ${RFValue(22)}px;
  margin: 5px 0px;
`

export const PetProperttie = styled.Text`
  text-align: left;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.BOLD};
    color: ${COLORS.TITLE};
  `}
  font-size: ${RFValue(18)}px;
  margin-left: 5px;
`

export const PetDescription = styled.Text`
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.REGULAR};
    color: ${COLORS.TEXT};
  `}
  font-size: ${RFValue(14)}px;
  padding: 5px;
`

export const PetBirthDate = styled.Text`
  text-align: left;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.REGULAR};
    color: ${COLORS.TEXT};
  `}
  font-size: ${RFValue(16)}px;
`

export const Content = styled.View`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`

export const PetProperttieWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`
