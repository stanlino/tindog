import React, { useCallback, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import I18n from 'i18n-js';

import { SmallButton } from '@components/SmallButton'
import { Container } from './container'

import { ImageTouchable, Span, ImagePreview, Row } from './styles'

import { useAddPet } from '../hooks/create_pet'

export function SetPetImage(){

  const { updatePropertties, photo } = useAddPet()

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [41, 57],
      quality: 1,
    })

    if (!result.cancelled) {
      updatePropertties({
        photo: result.uri
      })
    }
  }, [])

  return (
    <Container>
      {photo ? 
        <>
          <SmallButton onPress={pickImage} color='#333b89' style={{ alignSelf: 'flex-end' }}>
            <MaterialCommunityIcons name="image-edit" size={30} color="white" />
          </SmallButton>
          <ImagePreview source={{ uri: photo }} />
        </>
      :
        <ImageTouchable onPress={pickImage}>
          <MaterialIcons name='image' color='#0005' size={50} />
          <Span>
            {I18n.t('new_profile_add_image_span')}
          </Span>
        </ImageTouchable>
      }
    </Container>
  )
}