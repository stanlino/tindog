import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Alert, Linking, StatusBar } from 'react-native'
import { Button } from '@components/Button'
import { format, intervalToDuration, parse } from 'date-fns'
import I18n from 'i18n-js'

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

type DateFormatted = {
  nanoseconds: number
  seconds: number
}

export function Presentation({ navigation, route: { params } } : PresentationProps){

  const {
    pet,
    itsAMatch,
    contact
  } = params

  function calculateFullAge(pet_birth_date: Date) {
    const date = pet_birth_date as unknown as DateFormatted
    const dateFormatted = new Date(date.seconds * 1000)

    const birthDate = parse(format(dateFormatted, 'dd/MM/yyyy'), "dd/MM/yyyy", new Date())
    const { years, months } = intervalToDuration({ start: birthDate, end: new Date() })

    return `${years} ${I18n.t('year')}${years > 1 && 's'}${months! > 0 ? `, ${months} ${I18n.t('month')}${months > 1 && 's'}` : ''}`
  }

  async function redirectToEmail() {

    const message = I18n.t('email_message')

    const subject = I18n.t('email_subject')

    const announcement = I18n.t('announcement_email_redirect')
      
    const url = `mailto:${contact}?subject=${subject}&body=${message}`

    Alert.alert(I18n.t('redirect'), `${announcement}`, [
      { text: I18n.t('close') },
      { text: I18n.t('next'), onPress: () => {
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
          <Location>{calculateFullAge(pet.birth_date)}</Location>
        </Row>
        <Description>{pet.description}</Description>
        {itsAMatch && <Button title={I18n.t('write_email')} onPress={redirectToEmail} />}
      </Content>
    </Container>
  )
}