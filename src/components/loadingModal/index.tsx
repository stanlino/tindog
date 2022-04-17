import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { Modal } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { Container } from './styles'

export function LoadingModal({ loading } : { loading: boolean }){
  return (
    <Modal visible={loading} transparent animationType="fade">
      <Container>
        <AnimatedLottieView 
          source={require('@assets/lottie/cat-loading')}
          style={{
            width: RFPercentage(40)
          }}
          autoPlay
          loop
          speed={2}
        />
      </Container>
    </Modal>
  )
}