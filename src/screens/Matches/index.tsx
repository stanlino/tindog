import React from 'react'
import { FlatList } from 'react-native'

import { Container } from '@components/Container'
import { MatchesStackScreenProps } from 'src/types/routes'

import { 
  Title,
  MatchView,
  Avatar,
  Side,
  Name,
  Touchable,
  Text
} from './styles'

export function Matches({ navigation } : MatchesStackScreenProps){

  function handleNavigateToProfile() {
    navigation.navigate('profile')
  }
  
  return (
    <Container>
      <Title>Matches</Title>
      <FlatList 
        contentContainerStyle={{
          paddingTop: 20
        }}
        data={[0]}
        keyExtractor={item => String(item)}
        renderItem={({item}) => {
          return (
            <MatchView>
              <Avatar source={{ uri: 'https://static1.patasdacasa.com.br/articles/7/44/7/@/1498-algumas-racas-de-cachorro-sao-mais-indep-opengraph_1200-1.jpg' }} />
              <Side>
                <Name>Jonh Doe</Name>
                <Touchable onPress={handleNavigateToProfile}>
                  <Text>Visualizar perfil</Text>
                </Touchable>
              </Side>
            </MatchView>
          )
        }}
      />
    </Container>
  )
}