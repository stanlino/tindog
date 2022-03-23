import React, { useRef } from 'react'
import { ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'; 

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import SettingsModal, { SettingsModalProps } from '@screens/Settings';

import { 
  Container,
  Image,
  Name,
  SettingsButton,
  Form,
  Row,
  Field,
  FieldValue,
  Separator,
  TextInputField,
  Label,
  TextArea
} from './styles'

export function Profile(){

  const SettingsRef = useRef({} as SettingsModalProps)

  return (
    <Container>
      <SettingsModal default={true} ref={SettingsRef} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: 'https://t1.ea.ltmcdn.com/pt/posts/7/9/4/lista_dos_cachorros_mais_bonitos_do_mundo_20497_orig.jpg' }} />
        <Name />
        <SettingsButton onPress={SettingsRef.current?.openSettingsModal}>
          <Feather name="settings" size={30} color="black" />
        </SettingsButton>
        <Form>
          <Field>
            <FieldValue>Cachorro</FieldValue>
          </Field>
          <Row>
            <Field>
              <FieldValue>{'Macho'}</FieldValue>
            </Field>
            <Separator />
            <TextInputField />
          </Row>
              
          <Label>O adjetivo certo para Jonh</Label>
          <Input placeholder='Brincalhão' value={'adjective'} />

          <Label>Um pouco sobre Jonh</Label>
          <TextArea value={'description'} placeholder='Passa a maior parte do dia brincando e se divertindo!' />

          <Button title='Salvar alterações' />
        </Form>
      </ScrollView>

    </Container>
  )
}