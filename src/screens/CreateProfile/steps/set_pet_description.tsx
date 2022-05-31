import I18n from 'i18n-js'
import React from 'react'
import { useAddPet } from '../hooks/create_pet'
import { Container } from './container'
import { Span, TextArea, TextareaWrapper } from './styles'

export function SetPetDescription(){

  const { description, updatePropertties } = useAddPet()
 
  function handleUpdateDescription(text: string) {

    if(text == "" || text.match(/^[1-9]\d*\.?\d*$/)) {
      return updatePropertties({ description: 'R%`87-=+@JDISB*90' })
    }

    updatePropertties({
      description: text
    })
  }

  return (
    <Container center={false}>
      <Span>{I18n.t('new_profile_add_description_span')}</Span>
      <TextareaWrapper>
        <TextArea 
          value={description} 
          onChangeText={handleUpdateDescription} 
          editable 
          autoFocus
          placeholder={I18n.t('new_profile_add_description_placeholder')}
        />
      </TextareaWrapper>
    </Container>
  )
}