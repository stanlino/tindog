import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome } from '@expo/vector-icons'; 
import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

interface ButtonProps {
  type: 'decline' | 'accept'
}

export const Title = styled.Text`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(35)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
`

export const Profiles = styled.View`
  margin-top: 20px;
  flex: 1;
`

export const Profile = styled.View`
  width: ${screenWidth - 48}px;
  height: ${screenHeight * 0.55}px;
  border-radius: 10px;
  overflow: hidden;
`

export const ProfileImage = styled.Image.attrs({
  resizeMode: 'cover'
})`
  width: ${screenWidth - 48}px;
  height: ${screenHeight * 0.55}px;
`

export const ProfileInfo = styled.View`
  margin-top: -60px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  flex-direction: row;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

export const ProfileName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-size: ${RFValue(20)}px;
    font-family: ${theme.FONTS.REGULAR};
  `}
`

export const ProfileAdjective = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.PRIMARY};
    font-size: ${RFValue(20)}px;
    font-family: ${theme.FONTS.BOLD};
  `}
`


export const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: -10px;
  margin-top: 10px;
`

export const Button = styled.TouchableOpacity<ButtonProps>`
  height: ${RFValue(70)}px;
  width: ${RFValue(70)}px;

  margin-left: 15px;
  margin-right: 15px;

  border-radius: ${RFValue(50)}px;
  
  ${({ theme, type }) => css`
    background-color: ${type === 'accept' ? theme.COLORS.PRIMARY : theme.COLORS.SHAPE};
  `}

  justify-content: center;
  align-items: center;
  
`

export const Icon = styled(FontAwesome)<ButtonProps>`
  color: ${({ type, theme }) => type === 'accept' ? theme.COLORS.SHAPE : theme.COLORS.PRIMARY};
  font-size: 30px;
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const NoHaveMoreProfiles = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.BOLD};
  `}
  font-size: ${RFValue(20)}px;
  text-align: center;
`
