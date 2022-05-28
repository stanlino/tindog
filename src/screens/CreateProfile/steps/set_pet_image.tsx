import React, { useCallback, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; 

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
          <SmallButton onPress={pickImage} color='grey' style={{ alignSelf: 'flex-end' }}>
            <MaterialIcons name='replay' color='#fff' size={30} />
          </SmallButton>
          <ImagePreview source={{ uri: photo }} />
        </>
      :
        <ImageTouchable onPress={pickImage}>
          <MaterialIcons name='image' color='#0005' size={50} />
          <Span>
            Toque para adicionar uma imagem do seu pet
          </Span>
        </ImageTouchable>
      }
    </Container>
  )
}