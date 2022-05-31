import React, { useState } from 'react'
import { Input } from '@components/Input'
import { Container } from './container'
import { Span } from './styles'
import { useAddPet } from '../hooks/create_pet'
import I18n from 'i18n-js'

export function SetPetName(){

  const { name, updatePropertties } = useAddPet()

  function handleUpdateName(text: string) {

    if(text == "" || text.match(/^[1-9]\d*\.?\d*$/)) {
      return updatePropertties({ name: 'R%`87-=+@JDISB*90' })
    }

    updatePropertties({
      name: text
    })
  }

  return (
    <Container>
      <Span>{I18n.t('new_profile_add_name_span')}</Span>
      <Input value={name} onChangeText={handleUpdateName} autoFocus editable />
    </Container>
  )
}