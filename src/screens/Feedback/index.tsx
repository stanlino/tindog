import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import firestore from '@react-native-firebase/firestore'
import { Alert } from 'react-native';

import { useAuth } from '@hooks/auth'
import { FeedbackScreenProps } from '@types_/routes'

import { SmallButton } from '@components/SmallButton'
import { Button } from '@components/Button'


import { 
  Container, 
  Row,
  Span,
  TextArea,
  Title,
  Wrapper
} from './styles'

export function Feedback({ navigation } : FeedbackScreenProps){

  const { user } = useAuth()

  const [feedbackText, setFeedbackText] = useState('')

  function handleSendFeedback() {
    
    firestore().collection('feedbacks').add({
      feedback: feedbackText,
      user_id: user.uid
    })

    setFeedbackText('')
    Alert.alert('Feedback enviado!', 'Obrigado por seu feedback :)')
  }

  return (
    <Container>
      <Row>
        <Title>Deixe seu feedback</Title>
        <SmallButton color='#dbe9f4' onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color="#000" />
        </SmallButton>
      </Row>
      <Wrapper>
        <Span>O que está achando? Acredita que está faltando algo? Acredita que está faltando muita coisa? Seu feedback é de extrema importância pra mim! Solta o verbo!</Span>
        <TextArea value={feedbackText} onChangeText={setFeedbackText} editable placeholder='Escreva seu feedback aqui!' />
      </Wrapper>
      {feedbackText.length > 0 && <Button title='Vamos lá' onPress={handleSendFeedback} />}
    </Container>
  )
}