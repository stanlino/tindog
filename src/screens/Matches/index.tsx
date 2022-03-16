import React from 'react'
import { FlatList } from 'react-native'

import { Container } from '@components/Container'
import { 
  Title,
  MatchView,
  Avatar,
  Side,
  Name,
  Touchable,
  Text
} from './styles'

export function Matches(){
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
                <Touchable>
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