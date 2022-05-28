import React from 'react'
import { Container } from './container'
import DatePicker from 'react-native-date-picker'
import { Span } from './styles'
import { useAddPet } from '../hooks/create_pet'

export function SetPetAge(){
  
  const { birthDate, updatePropertties } = useAddPet()

  function handleSetBirthDate(birthDate: Date) {
    updatePropertties({
      birthDate
    })
  }

  return (
    <Container>
      <Span>Em que data aproximada seu pet nasceu?</Span>
      <DatePicker 
        date={birthDate} 
        onDateChange={(date) => handleSetBirthDate(date)} 
        style={{alignSelf: 'center'}}
        mode='date'
        locale='pt-BR'
        androidVariant='nativeAndroid'
        maximumDate={new Date()}
      />
    </Container>
  )
}