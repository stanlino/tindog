import { Pet, usePet } from '@hooks/pet_document'
import React, { useRef } from 'react'
import { calculateFullAge } from '../../utils/calcAge'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { State, TapGestureHandler, TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';

import { useMatch } from '@hooks/match';

import {
  Card, 
  ProfileImage,
  Box,
  ProfileName,
  ProfileAge,
  ProfileLocation,
  CardContainer
} from './styles'
import { likeProfile, unlikeProfile } from './utils/firestore';
import { useAuth } from '@hooks/auth';

interface ProfileProps {
  item: Pet
  index: number
  navigateToProfile: (pet: Pet) => void
  interaction: 'reject' | 'like'
}

export function Profile({ item, index, navigateToProfile, interaction } : ProfileProps){

  const doubleTapRef = useRef(null)

  const { updateVisualizedProfiles, currentPet } = usePet()
  const { user } = useAuth()

  const onSingleTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      navigateToProfile(item)
    }
  }

  const onDoubleTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (interaction === 'like') {
        likeProfile(currentPet, item, user.email!)
      } else {
        unlikeProfile(currentPet, item)
      }
      updateVisualizedProfiles(item.id, interaction === 'like' ? 'reject' : 'like')
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