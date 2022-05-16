import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { StatusBar } from 'react-native'

import { PresentationProps } from '@types_/routes'

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

export function Presentation({ navigation, route: { params } } : PresentationProps){

  const pet = params.pet

  return (
    <Container>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={'#0000'}/>

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