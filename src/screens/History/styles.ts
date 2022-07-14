import { RectButton } from 'react-native-gesture-handler'
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
  justify-content: center;
`

export const CardContainer = styled.View`
  padding: 3px;
`

export const Card = styled(RectButton)`
  height: 100px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin: 5px 0px;
  background-color: #FFF;
  border-radius: 5px;
`

export const ProfileImage = styled.Image.attrs({
  resizeMode: 'contain'
})`
  height: 80px;
  aspect-ratio: ${41/57};
  border-radius: 8px;
`

export const Box = styled.View`
  flex: 1;
  padding: 0 10px;
`

export const ProfileName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.BOLD};
  `}
  font-size: ${RFValue(16)}px;
`

export const ProfileAge = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-family: ${theme.FONTS.REGULAR};
  `}
  font-size: ${RFValue(14)}px;
`

export const ProfileLocation = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-family: ${theme.FONTS.REGULAR};
  `}
  font-size: ${RFValue(14)}px;
`

export const Span = styled.Text`
  text-align: center;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.LIGHT};
    color: ${COLORS.TITLE};
  `}
  font-size: ${RFValue(12)}px;
`

export const Content = styled.View`
  flex: 1;
  padding-top: 50px;
  align-items: center;
`

export const Output = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.BOLD};
  `}
  font-size: ${RFValue(20)}px;
  text-align: center;
  margin-top: 30px;
`

export const Warning = styled.Text`
  text-align: center;
  ${({ theme: { COLORS, FONTS } }) => css`
    font-family: ${FONTS.LIGHT};
    color: ${COLORS.TITLE};
  `}
  font-size: ${RFValue(12)}px;
  text-transform: uppercase;
  margin: 10px 20px;
`