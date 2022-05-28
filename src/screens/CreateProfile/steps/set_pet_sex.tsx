import { Foundation } from '@expo/vector-icons'; 
import React, { useState } from 'react'
import { useAddPet } from '../hooks/create_pet';
import { Container } from './container'
import { 
  Row,
  Span, 
  SmallTouchable 
} from './styles'

type Sex = 'male' | 'female'

export function SetPetSex(){

  const { sex, updatePropertties } = useAddPet()

  function handleSetSex(sex: Sex) {
    updatePropertties({
      sex
    })
  }

  return (
    <Container>
      <Span>De qual sexo seu bixinho pertence?</Span>
      <Row>
        <SmallTouchable onPress={() => handleSetSex('male')} selected={sex === 'male'} center>
          <Foundation name="male-symbol" size={70} color="black" />
        </SmallTouchable>
        <SmallTouchable onPress={() => handleSetSex('female')} selected={sex === 'female'} center>
          <Foundation name="female-symbol" size={70} color="black" />
        </SmallTouchable>
      </Row>
      <Span>{sex === 'male' ? 'Trata-se de um macho' : sex === 'female' ? 'Trata-se de uma fêmea' : ''}</Span>
    </Container>
  )
}