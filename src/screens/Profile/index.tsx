import React, { useEffect, useReducer, useRef } from 'react'
import { Keyboard, Modal, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import { RFValue } from 'react-native-responsive-fontsize';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Container as ContainerRef } from '@components/Container'

import { 
  Container,
  Title,
  Profiles,
  AddProfileButton,
  Image,
  Form,
  InfoRow,
  InfoRowField,
  Info,
  Label,
  TextArea
} from './styles'

export function Profile(){

  const [modalVisible, toggleModalVisible] = useReducer(visible => !visible, true)
  const scrollViewRef = useRef<ScrollView>({} as ScrollView)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current.scrollToEnd({ animated: true })
    })

    return () => Keyboard.removeAllListeners('keyboardDidShow')
  },[])

  return (
    <Container>
      <Modal statusBarTranslucent visible={modalVisible} onRequestClose={toggleModalVisible}>
        <ContainerRef>
          <Title>Vamos começar?</Title>
          <Profiles>
            <AddProfileButton>
              <Ionicons name="ios-add" size={RFValue(40)} color="black" />
            </AddProfileButton>
          </Profiles>
          <Button title='fechar' onPress={toggleModalVisible} />
        </ContainerRef>
      </Modal>

      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: 'https://static1.patasdacasa.com.br/articles/7/44/7/@/1498-algumas-racas-de-cachorro-sao-mais-indep-opengraph_1200-1.jpg' }} />
        <Form>
          <InfoRow>
            <InfoRowField>
              <Info>Macho</Info>
            </InfoRowField>
            <InfoRowField>
              <Info>2019</Info>
            </InfoRowField>
          </InfoRow>
              
          <Label>O adjetivo certo para Jonh</Label>
          <Input placeholder='Brincalhão' />

          <Label>Um pouco sobre Jonh</Label>
          <TextArea placeholder='Passa a maior parte do dia brincando e se divertindo!' />

          <Button title='Salvar alterações' />
        </Form>
      </ScrollView>

    </Container>
  )
}