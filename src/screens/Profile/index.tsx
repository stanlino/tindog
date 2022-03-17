import React, { useEffect, useReducer, useRef } from 'react'
import { Keyboard, Modal, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import { RFValue } from 'react-native-responsive-fontsize';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Container as ContainerRef } from '@components/Container'

import { ProfileScreenProps } from 'src/types/routes';

import { 
  Container,
  Title,
  Profiles,
  AddProfileButton,
  Image,
  Name,
  Form,
  InfoRow,
  InfoRowField,
  Info,
  Label,
  TextArea
} from './styles'

export function Profile({ route } : ProfileScreenProps){

  const {
    isMyProfile,
    photo,
    name,
    sex,
    age,
    adjective,
    description,
  } = route.params

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
      {
        isMyProfile && (
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
        )
      }

      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: photo }} />
        <Name>{name}</Name>
        <Form>
          <InfoRow>
            <InfoRowField>
              <Info>{sex}</Info>
            </InfoRowField>
            <InfoRowField>
              <Info>{age}</Info>
            </InfoRowField>
          </InfoRow>
              
          <Label>O adjetivo certo para Jonh</Label>
          <Input placeholder='Brincalhão' value={adjective} />

          <Label>Um pouco sobre Jonh</Label>
          <TextArea value={description} placeholder='Passa a maior parte do dia brincando e se divertindo!' />

          <Button title='Salvar alterações' />
        </Form>
      </ScrollView>

    </Container>
  )
}