import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import { ProfilePresentationProps } from 'src/types/routes'

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

export function ProfilePresentation({ navigation, route: { params } } : ProfilePresentationProps){

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