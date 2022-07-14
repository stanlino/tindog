import { Pet } from '@hooks/pet_document'
import React, { useRef } from 'react'
import { calculateFullAge } from '../../utils/calcAge'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Animated from 'react-native-reanimated';
import Swipeable, { SwipeableProps } from 'react-native-gesture-handler/Swipeable'

import {
  Card, 
  ProfileImage,
  Box,
  ProfileName,
  ProfileAge,
  ProfileLocation,
  CardContainer
} from './styles'
import { State, TapGestureHandler, TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';

interface ProfileProps {
  item: Pet
  index: number
  navigateToProfile: (pet: Pet) => void
  interaction: 'like' | 'reject'
}

export function Profile({ item, index, navigateToProfile, interaction} : ProfileProps){

  const doubleTapRef = useRef(null)

  const onSingleTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      navigateToProfile(item)
    }
  }

  const onDoubleTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // faça algo a respeito stanley!!!!!!!!
    }
  }

  return (
    <TapGestureHandler
      numberOfTaps={1}
      onHandlerStateChange={onSingleTap}
      waitFor={doubleTapRef}
    >
      <TapGestureHandler
        ref={doubleTapRef}
        numberOfTaps={2}
        onHandlerStateChange={onDoubleTap}
      >
        <CardContainer>
          <Card style={{elevation: 3}}>
            <ProfileImage 
              source={{ uri: item.photo }}
            />
            <Box>
              <ProfileName>{item.name}</ProfileName>
              <ProfileAge>{calculateFullAge(item.birth_date)}</ProfileAge>
              <ProfileLocation>{`${item.city} - ${item.state}`}</ProfileLocation>
            </Box>
            <MaterialCommunityIcons  
              style={{ marginHorizontal: 10 }} 
              name={interaction === 'like' ? 'heart' : 'heart-broken'} size={24} 
              color={interaction === 'like' ? 'red' :  'purple'}
            />
          </Card>
        </CardContainer>
      </TapGestureHandler>
    </TapGestureHandler>
  )
}