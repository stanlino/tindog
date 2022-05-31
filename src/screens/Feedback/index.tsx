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
import I18n from 'i18n-js';

export function Feedback({ navigation } : FeedbackScreenProps){

  const { user } = useAuth()

  const [feedbackText, setFeedbackText] = useState('')

  function handleSendFeedback() {
    
    firestore().collection('feedbacks').add({
      feedback: feedbackText,
      user_id: user.uid
    })

    setFeedbackText('')
    Alert.alert(I18n.t('feedback_sent'), I18n.t('thanks_feedback'))
  }

  return (
    <Container>
      <Row>
        <Title>{I18n.t('feedback_title')}</Title>
        <SmallButton color='#dbe9f4' onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color="#000" />
        </SmallButton>
      </Row>
      <Wrapper>
        <Span>
          {I18n.t('feedback_span')}
        </Span>
        <TextArea 
          value={feedbackText} 
          onChangeText={setFeedbackText} 
          editable 
          placeholder={I18n.t('feedback_placeholder')}
        />
      </Wrapper>
      {feedbackText.length > 0 && <Button title={I18n.t('send')} onPress={handleSendFeedback} />}
    </Container>
  )
}