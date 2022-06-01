import React from 'react'
import { ScrollView } from 'react-native'
import { Foundation, MaterialIcons } from '@expo/vector-icons'; 
import { RFValue } from 'react-native-responsive-fontsize';
import I18n from 'i18n-js';

import { parse, format, intervalToDuration } from 'date-fns'

import { useAddPet } from '../hooks/create_pet'
import { Container } from './container'
import { 
  Row, 
  Span,
  ShortImage,
  PetName,
  PetProperttie,
  PetBirthDate,
  Content,
  PetDescription,
  PetProperttieWrapper
} from './styles'

export function ConfirmPetCreation(){
  
  const petPropertties = useAddPet()

  function calculateFullAge() {
    const birthDate = parse(format(petPropertties.birthDate, 'dd/MM/yyyy'), "dd/MM/yyyy", new Date())
    const { years, months } = intervalToDuration({ start: birthDate, end: new Date() })

    return `${years} ${I18n.t('year')}${years! > 1 && 's'}${months! > 0 ? `, ${months} ${I18n.t('months')}` : ''}`
  }

  return (
    <Container center={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Span>{I18n.t('new_profile_confirm_creation_span')}</Span>
        <Content style={{ elevation: 2 }}>
          <ShortImage source={{ uri: petPropertties.photo }} />
          <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <PetName>{petPropertties.name}</PetName>
            <PetBirthDate>{calculateFullAge()}</PetBirthDate>
          </Row>
        </Content>
        <Content style={{ elevation: 2 }}>
          <Row>
            <PetProperttieWrapper>
              <MaterialIcons name='pets' size={RFValue(22)} />
              <PetProperttie>{petPropertties.species === 'cat' ? I18n.t('cat') : I18n.t('dog')}</PetProperttie>
            </PetProperttieWrapper>
            <PetProperttieWrapper>
              <Foundation name={petPropertties.sex === 'male' ? 'male-symbol' : 'female-symbol'} size={RFValue(24)} />
              <PetProperttie>{petPropertties.sex === 'male' ? I18n.t('male') : I18n.t('female')}</PetProperttie>
            </PetProperttieWrapper>
          </Row>
        </Content>
        <Content style={{ elevation: 2 }}>
          <PetDescription>
            {petPropertties.description}
          </PetDescription>
        </Content>
      </ScrollView>
    </Container>
  )
}