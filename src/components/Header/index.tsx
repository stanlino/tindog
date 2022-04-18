import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 

import { FeedbackModal } from '@components/FeedbackModal';

import {
  Container, 
  Title
} from './styles'

interface HeaderProps {
  title: string
}

export function Header({ title } : HeaderProps){

  const [feedbackModalIsVisible, setFeedbackModalIsVisible] = useState(false)

  return (
    <Container>
      <FeedbackModal setVisible={setFeedbackModalIsVisible} visible={feedbackModalIsVisible} />
      <Title>
        {title}
      </Title>
      <TouchableOpacity onPress={() => setFeedbackModalIsVisible(true)}>
        <MaterialIcons name="feedback" size={35} color="#fff" />
      </TouchableOpacity>
    </Container>
  )
}