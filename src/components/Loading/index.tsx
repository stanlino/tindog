import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { Modal, View } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export function Loading({ visible } : {visible: boolean}){
  return (
    <Modal transparent visible={visible} animationType='fade'>
      <View style={{ 
        flex: 1, 
        backgroundColor: '#0003', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <AnimatedLottieView 
          source={require('@assets/lottie/cat-loading.json')}
          style={{
            width: RFPercentage(40),
          }}
          autoPlay
          loop
          speed={2}
        />
      </View>
    </Modal>
  )
}