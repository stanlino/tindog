import React, { useState } from 'react'
import { Modal, ScrollView, StatusBar } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { format, intervalToDuration, parse } from 'date-fns';
import I18n from 'i18n-js';

import { Header } from './components/header';
import { Button } from '@components/Button';
import { SmallButton } from '@components/SmallButton';

import { ProfileScreenProps } from '../../types/routes';

import { usePet } from '../../hooks/pet_document';

import { 
  Container, 
  BirthDate, 
  Name, 
  Row,
  Wrapper,
  Description,
  TextArea,
} from './styles'

type DateFormatted = {
  nanoseconds: number
  seconds: number
}

export function Profile({ navigation } : ProfileScreenProps){

  const { currentPet, updatePetDescription } = usePet()

  const [photo, setPhoto] = useState(currentPet.photo)
  const [description, setDescription] = useState(currentPet.description)
  const [modalVisible, setModalVisible] = useState(false)

  function handleSetImage(imageUrl: string) {
    setPhoto(imageUrl)
  }

  function calculateFullAge() {
    const date = currentPet.birth_date as unknown as DateFormatted
    
    if (date.seconds) {
      const dateFormatted = new Date(date.seconds * 1000)
      const birthDate = parse(format(dateFormatted, 'dd/MM/yyyy'), "dd/MM/yyyy", new Date())
      const { years, months } = intervalToDuration({ start: birthDate, end: new Date() })

      return `${years} ${I18n.t('year')}${years! > 1 && 's'}${months! > 0 ? `, ${months} ${I18n.t('months')}` : ''}`
    }

    const birthDate = parse(format(currentPet.birth_date, 'dd/MM/yyyy'), "dd/MM/yyyy", new Date())
    const { years, months } = intervalToDuration({ start: birthDate, end: new Date() })

    return `${years} ${I18n.t('year')}${years! > 1 && 's'}${months! > 0 ? `, ${months} ${I18n.t('months')}` : ''}`
  }

  return (
    <Container>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={'#0003'}/>

        {modalVisible && (
          <Modal visible animationType='fade' onRequestClose={() => setModalVisible(false)}>
            <StatusBar hidden />
            <Container>
              <Row>
                <SmallButton color='#fff' onPress={() => setModalVisible(false)}>
                  <AntDesign name="close" size={30} color="#000" />
                </SmallButton>
              </Row>
              <Wrapper>
                <TextArea 
                  value={description} 
                  onChangeText={setDescription}
                  autoFocus
                />
              </Wrapper>
              <Button 
                disabled={description === currentPet.description}
                title={I18n.t('save_editions')}
                style={{ margin: 10 }} 
                onPress={() => {
                  updatePetDescription(description)
                  setModalVisible(false)
                }}
              />
            </Container>
          </Modal>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>  

          <Header 
            image={photo} 
            handleSetImage={handleSetImage} 
          />
          <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Name>{currentPet.name}</Name>
            <BirthDate>{calculateFullAge()}</BirthDate>
          </Row>

          <Wrapper>
            <Description>
              {currentPet.description}            
            </Description>
          </Wrapper>
          
          <Button 
            title={I18n.t('edit_description')}
            onPress={() => setModalVisible(true)}
            style={{ marginHorizontal: 10, marginBottom: 10 }} 
          />
            
        </ScrollView>
    </Container>
  )
}