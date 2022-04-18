import { Button } from '@components/Button'
import AnimatedLottieView from 'lottie-react-native'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { Keyboard, Modal } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import {
  Container, 
  Content,
  Message,
  TextArea
} from './styles'

interface ModalProps {
  visible: boolean
  setVisible(value: boolean): void
}

export function FeedbackModal({ visible, setVisible } : ModalProps){
  
  const [headerVisible, toggleHeaderVisible] = useReducer(value => !value, true)
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')
  const [feedbackStatus, setFeedbackStatus] = useState('not-sent')

  const sendFeedback = useCallback((userFeedback: string) => {
    firestore().collection('feedbacks').add({
      feedback: userFeedback
    }).finally(() => {
      setFeedbackStatus('sent')
    })
  }, [])

  function handleSubmit() {
    if (feedback.length < 20) {
      return setError('Só isso? Detalha um pouco mais! Seu feedback é muito importante pra mim!')
    }

    sendFeedback(feedback)
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      toggleHeaderVisible()
    })

    Keyboard.addListener('keyboardDidHide', () => {
      toggleHeaderVisible()
    })
  },[])
  
  return (
    <Modal transparent visible={visible} onRequestClose={() => setVisible(false)} animationType='fade'>
      <Container onPress={() => setVisible(false)}>
        <Content>
          {headerVisible && (
            <>
              {feedbackStatus === 'not-sent' ? (
                <AnimatedLottieView 
                  source={require('@assets/lottie/ratings.json')}
                  style={{
                    width: RFPercentage(40),
                  }}
                  autoPlay
                  loop
                  speed={2}
                />
              ) : (
                <AnimatedLottieView 
                  source={require('@assets/lottie/email-sent')}
                  style={{
                    width: RFPercentage(40),
                  }}
                  autoPlay
                  loop={false}
                />
              )}
              {feedbackStatus === 'not-sent' && (
                <Message>
                  Seu feedback é exencial para o desenvolvimento do app!
                </Message>
              )}
            </>
          )}
          {feedbackStatus === 'not-sent' && (
            <TextArea 
              editable 
              multiline={true} 
              placeholder='Lança a braba!'
              textAlignVertical='top'
              value={feedback}
              onChangeText={setFeedback}
            />
          )}
          <Button 
            onPress={feedbackStatus === 'not-sent' ? handleSubmit : () => setVisible(false)} 
            title={feedbackStatus === 'not-sent' ? 'Enviar feedback' : 'Fechar'} 
          />
        </Content>
      </Container>
    </Modal>
  )
}