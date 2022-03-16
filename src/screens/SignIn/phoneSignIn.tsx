import React, { useReducer, useState } from 'react'

import { Modal } from 'react-native'

import { Container } from '@components/Container'
import { BackButton } from '@components/BackButton'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { PhoneSignInScreenProps } from 'src/types/routes'

import { 
  Title,
  Form,
  Label,
  TextInputWrapper,
  DDI
} from './styles'

export function PhoneSignIn({ navigation: { goBack } } : PhoneSignInScreenProps){

  const [phoneNumberWithRegex, setPhoneNumberWithRegex] = useState('')
  const [code, setCode] = useState('')
  const [modalVisible, toggleModalVisible] = useReducer(isVisible => !isVisible, false)

  const phoneNumber = phoneNumberWithRegex.replace(/[^\d]/g, "")

  function handleSetPhoneNumber(text: string) {
    if (phoneNumber.length >= 2 && phoneNumber.length < 7) {
      setPhoneNumberWithRegex(text.replace(/^(\d{2})(\d)/, "($1) $2"))
    } else if (phoneNumber.length === 7) {
      setPhoneNumberWithRegex(text.replace(/^(.{10})(.)/, "$1-$2"))
    } else {
      setPhoneNumberWithRegex(text)
    }
  }

  function handleSendPhoneNumber() {
    toggleModalVisible()
  }

  return (
    <Container>
      <BackButton action={goBack} />

      <Title>tindog</Title>
        
      <Form>

        <Label>Digite seu número de telefone</Label>

        <TextInputWrapper>
          <DDI>+55</DDI>
          <Input 
            keyboardType='number-pad'
            placeholder='63 99999 9999'
            value={phoneNumberWithRegex}
            onChangeText={handleSetPhoneNumber}
            maxLength={15}
          />
        </TextInputWrapper>

        <Button 
          title="Enviar código para este número"
          disabled={phoneNumber.length < 11}
          onPress={handleSendPhoneNumber}
        />

      </Form>

      <Modal statusBarTranslucent animationType='slide' visible={modalVisible} onRequestClose={toggleModalVisible}>
        <Container>
          <BackButton action={toggleModalVisible} close />

          <Title>tindog</Title>

          <Form>

            <Label>{`Escreva o código enviado para \n${phoneNumberWithRegex}`}</Label>

            <TextInputWrapper>
              <Input 
                keyboardType='number-pad'
                placeholder='xxxxxx'
                value={code}
                onChangeText={setCode}
                maxLength={5}
              />
            </TextInputWrapper>

            <Button 
              title="Enviar código de confirmação"
              disabled={phoneNumber.length < 11}
              onPress={handleSendPhoneNumber}
            />

          </Form>

        </Container>
      </Modal>

    </Container>
  )
}