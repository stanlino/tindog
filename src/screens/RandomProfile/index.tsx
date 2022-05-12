import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import { RandomProfileScreenProps } from 'src/types/routes'

import { 
  Container,
  Touchable,
  Photo,
  Content,
  Row,
  Description,
  Name,
  Location
} from './styles'

export function RandomProfile({ navigation, route: { params } } : RandomProfileScreenProps){

  const pet = params.pet

  return (
    <Container>
      <Photo source={{ uri: pet.photo!}} />
      <Touchable onPress={() => navigation.goBack()}>
        <MaterialIcons name="close" size={30} color={'#fff'} />
      </Touchable>
      <Content>
        <Row>
          <Name>{pet.name}</Name>
          <Location>{pet.location}</Location>
        </Row>
        <Description>{pet.description}</Description>
      </Content>
    </Container>
  )
}