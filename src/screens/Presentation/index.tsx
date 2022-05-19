import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Alert, Linking, StatusBar } from 'react-native'
import { Button } from '@components/Button'

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

  const {
    pet,
    itsAMatch,
    contact
  } = params

  const petArticle = pet.sex === 'male' ? 'o' : 'a'

  async function redirectToEmail() {

    const message = 'Oi tudo bem? Nossos pets deram match no tindog!, vamos planejar o casamento, ou ja pulamos pra lua de mel?'

    const subject = 'Nós demos um match no tindog!'

    const announcement = `Enquanto desenvolvemos um chat você pode conversar com @ responsável d${petArticle} ${pet.name}`
      
    const url = `mailto:${contact}?subject=${subject}&body=${message}`

    Alert.alert('Redirecionamento', `${announcement} via email! \n\nSinta-se a vontade para editar o corpo do email previamente já escrito 😺`, [
      { text: 'Cancelar' },
      { text: 'Conferir Email', onPress: () => {
        Linking.openURL(url)
      }}
    ]) 
  }

  return (
    <Container>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={'#0000'}/>

      <Photo source={{ uri: pet.photo!}} />
      <Touchable onPress={() => navigation.goBack()}>
        <MaterialIcons name="close" size={30} color={'#fff'} />
      </Touchable>
      <Content
        from={{
          opacity: 0,
          transform: [{ translateY: 100 }]
        }}
        animate={{
          opacity: 1,
          transform: [{ translateY: 0 }]
        }}
        transition={{
          type: 'spring',
          delay: 100
        }}
      >
        <Row>
          <Name>{pet.name}</Name>
          <Location>{pet.location}</Location>
        </Row>
        <Description>{pet.description}</Description>
        {itsAMatch && <Button title='Escrever email' onPress={redirectToEmail} />}
      </Content>
    </Container>
  )
}