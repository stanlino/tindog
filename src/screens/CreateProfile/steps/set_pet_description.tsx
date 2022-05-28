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
      <Span>Escreva uma descrição do seu pet</Span>
      <TextareaWrapper>
        <TextArea 
          value={description} 
          onChangeText={handleUpdateDescription} 
          editable 
          autoFocus
          placeholder={`Exemplo: Passa a maior parte do seu tempo brincando ou enchendo o saco das pessoas na rua :)\n\nDeixe claro o motivo do seu pet ser o par romântico de outro!`}
        />
      </TextareaWrapper>
    </Container>
  )
}