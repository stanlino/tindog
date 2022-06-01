import React from 'react'
import { Modal } from 'react-native'
import AnimatedLottieView from 'lottie-react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { Container } from '@components/Container'
import { Span, Wrapper } from './styles'
import I18n from 'i18n-js'

type UpdateStep = 'DOWNLOADING' | 'FINISH'

interface UpdatesModalProps {
  step: UpdateStep
  visible: boolean
}

export function UpdatesModal({ step, visible } : UpdatesModalProps){
  return (
    <Modal visible={visible} animationType='fade'>
      <Container>
        <Wrapper>
          <AnimatedLottieView 
            source={require('@assets/lottie/cat-download.json')}
            autoPlay
            loop
            style={{
              width: RFPercentage(40)
            }}
          />
          <Span>
            {I18n.t('update_span')}
          </Span>
        </Wrapper>
      </Container>
    </Modal>
  )
}