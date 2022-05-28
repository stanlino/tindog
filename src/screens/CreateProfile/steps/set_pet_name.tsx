import React, { useState } from 'react'
import { Input } from '@components/Input'
import { Container } from './container'
import { Span } from './styles'
import { useAddPet } from '../hooks/create_pet'

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
      <Span>Escreva o nome do seu bixinho</Span>
      <Input value={name} onChangeText={handleUpdateName} autoFocus editable />
    </Container>
  )
}