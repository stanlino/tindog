import React, { useEffect, useRef } from 'react'
import { Keyboard, ScrollView } from 'react-native'

import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { 
  Container,
  Image,
  Name,
  Form,
  InfoRow,
  InfoRowField,
  Info,
  Label,
  TextArea
} from './styles'

export function Profile(){

  const scrollViewRef = useRef<ScrollView>({} as ScrollView)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current.scrollToEnd({ animated: true })
    })

    return () => Keyboard.removeAllListeners('keyboardDidShow')
  },[])

  return (
    <Container>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: 'https://t1.ea.ltmcdn.com/pt/posts/7/9/4/lista_dos_cachorros_mais_bonitos_do_mundo_20497_orig.jpg' }} />
        <Name>{'name'}</Name>
        <Form>
          <InfoRow>
            <InfoRowField>
              <Info>{'sex'}</Info>
            </InfoRowField>
            <InfoRowField>
              <Info>{'age'}</Info>
            </InfoRowField>
          </InfoRow>
              
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