import { Foundation } from '@expo/vector-icons'; 
import I18n from 'i18n-js';
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
      <Span>{I18n.t('new_profile_add_species_span')}</Span>
      <Row>
        <SmallTouchable onPress={() => handleSetSex('male')} selected={sex === 'male'} center>
          <Foundation name="male-symbol" size={70} color="black" />
        </SmallTouchable>
        <SmallTouchable onPress={() => handleSetSex('female')} selected={sex === 'female'} center>
          <Foundation name="female-symbol" size={70} color="black" />
        </SmallTouchable>
      </Row>
      <Span>{sex === 'male' ? I18n.t('new_profile_add_sex_alternative_1') : 
      sex === 'female' ? I18n.t('new_profile_add_sex_alternative_2') : ''}</Span>
    </Container>
  )
}