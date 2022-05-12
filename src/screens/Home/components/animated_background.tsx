import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { View } from 'react-native'
import { BlurView } from '@react-native-community/blur'

export function AnimatedBackground(){
  return (
    <View style={{ flex: 1, position: 'absolute' }}>
      <AnimatedLottieView 
        source={require('@assets/lottie/background')}
        autoPlay
        loop
        speed={1}
        style={{ width: '100%', transform: [{ scale: 1.5 }]}}
      />
      <BlurView blurType='light' blurAmount={100} style={{ 
        position: 'absolute', 
        top: 0,
        left: 0,
        bottom: 0,
        right: 0  
      }} />
    </View>
  )
}