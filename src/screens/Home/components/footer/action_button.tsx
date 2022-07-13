import React, { useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import { Video } from 'expo-av'
import { useAnimationState, MotiView } from 'moti'

import Reject from '@assets/video/cat1.mp4'
import Like from '@assets/video/cat2.mp4'
import { RFValue } from 'react-native-responsive-fontsize'

interface ActionButtonProps {
  type: 'like' | 'reject'
  action: () => void
}

export function ActionButton({ type, action } : ActionButtonProps){

  const videoRef = useRef<Video>(null)

  const buttonAnimation = useAnimationState({
    pressIn: {
      transform: [{ scale: 0.8 }]
    },
    pressOut: {
      transform: [{ scale: 1 }]
    }
  })

  function animateButton(state: 'pressIn' | 'pressOut') {
    buttonAnimation.transitionTo(state)
  }

  function press() {
    videoRef.current?.replayAsync()
    action()
  }

  return (
    <TouchableOpacity 
      onPress={press} 
      activeOpacity={1}
      onPressIn={() => animateButton('pressIn')}
      onPressOut={() => animateButton('pressOut')}
    >
      <MotiView style={{
        height: RFValue(75),
        width: RFValue(75),
        borderRadius: RFValue(40),
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowOffset: {
          height: 0,
          width: 4
        },
        shadowRadius: 0.56,
        elevation: 5
      }}
        state={buttonAnimation}
      >
        <Video
          source={type === 'like' ? Like : Reject}
          ref={videoRef}
          resizeMode='contain'        
          style={{
            height: RFValue(75),
            width: RFValue(75),
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      </MotiView>
    </TouchableOpacity>
  )
}