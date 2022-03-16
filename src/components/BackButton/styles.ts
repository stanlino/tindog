import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'; 
import { StatusBar } from 'react-native';

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  margin-top: -15px;
  margin-left: -15px;

  height: 50px;
  width: 50px;
`

export const Icon = styled(Ionicons)`
  color: ${({ theme }) => theme.COLORS.TITLE};
  opacity: .4;
`