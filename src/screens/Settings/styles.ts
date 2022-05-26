import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import FastImage from 'react-native-fast-image'

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

export const Profile = styled.View`
  flex: 1;
  flex-direction: row;
`

export const ProfileImage = styled(FastImage)`
  height: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
`

export const ProfileBlock = styled.View`
  flex: 1;
  margin-left: 10px;
  justify-content: center;
`

export const ProfileName = styled.Text.attrs({
  numberOfLines: 1
})`
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.REGULAR};
  `}
  font-size: ${RFValue(20)}px;
`

export const ProfileLocation = styled.Text.attrs({
  numberOfLines: 1
})`
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.LIGHT};
  `}
  font-size: ${RFValue(14)}px;
`

export const ListItem = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(60)}px;
  padding: 5px 0px;
  align-items: center;
  flex-direction: row;
`

export const ItemTitle = styled.Text`
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.LIGHT};
    color: ${COLORS.TITLE};
  `}
  font-size: ${RFValue(14)}px;
  margin-left: 10px;
`

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #0001;
  align-self: center;
`

export const Version = styled.Text`
  text-align: center;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.LIGHT};
    color: ${COLORS.TITLE};
  `}
  font-size: ${RFValue(12)}px;
  text-transform: uppercase;
`