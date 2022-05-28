import React from 'react'
import { ScrollView } from 'react-native'
import { Foundation, MaterialIcons } from '@expo/vector-icons'; 

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
import { RFValue } from 'react-native-responsive-fontsize';

export function ConfirmPetCreation(){
  
  const petPropertties = useAddPet()

  function calculateFullAge() {
    const birthDate = parse(format(petPropertties.birthDate, 'dd/MM/yyyy'), "dd/MM/yyyy", new Date())
    const { years, months } = intervalToDuration({ start: birthDate, end: new Date() })

    return `${years} anos${months! > 0 ? ` e ${months} meses` : ''}`
  }

  return (
    <Container center={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Span>Tudo certo? Podemos prosseguir?</Span>
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
              <PetProperttie>{petPropertties.species === 'cat' ? 'Gato' : 'Cachorro'}</PetProperttie>
            </PetProperttieWrapper>
            <PetProperttieWrapper>
              <Foundation name={petPropertties.sex === 'male' ? 'male-symbol' : 'female-symbol'} size={RFValue(24)} />
              <PetProperttie>{petPropertties.sex === 'male' ? 'Macho' : 'Fêmea'}</PetProperttie>
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