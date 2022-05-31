import React from 'react'
import { Container } from './container'
import DatePicker from 'react-native-date-picker'
import { Span } from './styles'
import { useAddPet } from '../hooks/create_pet'
import I18n from 'i18n-js'
import * as Localization from 'expo-localization';

export function SetPetAge(){
  
  const { birthDate, updatePropertties } = useAddPet()

  function handleSetBirthDate(birthDate: Date) {
    updatePropertties({
      birthDate
    })
  }

  return (
    <Container>
      <Span>{I18n.t('new_profile_add_age_span')}</Span>
      <DatePicker 
        date={birthDate} 
        onDateChange={(date) => handleSetBirthDate(date)} 
        style={{alignSelf: 'center'}}
        mode='date'
        locale={Localization.locale}
        androidVariant='nativeAndroid'
        maximumDate={new Date()}
      />
    </Container>
  )
}