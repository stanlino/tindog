import React, { useCallback, useRef, useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import SettingsModal, { SettingsModalProps } from '@screens/Settings';
import { usePet } from '../../hooks/pet';

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
  TextArea,
  PickImageView
} from './styles'

export function Profile(){

  const { currentPet, registerPet } = usePet()

  const [name, setName] = useState(currentPet.name || '')
  const [image, setImage] = useState(currentPet.photo)
  
  const [type, setType] = useState(currentPet.type || 'dog')
  const [sex, setSex] = useState(currentPet.sex || 'male')
  const [age, setAge] = useState(currentPet.age || 2020)

  const [adjective, setAdjective] = useState(currentPet.adjective || '')
  const [description, setDescription] = useState(currentPet.description || '')

  const SettingsRef = useRef({} as SettingsModalProps)

  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }, [])

  const handleToggleSex = useCallback(() => {
    setSex(sex => sex === 'female' ? 'male' : 'female')
  }, [])

  const handleToggleType = useCallback(() => {
    setType(sex => sex === 'dog' ? 'cat' : 'dog')
  }, [])

  function handleOpenSettingsModal() {
    SettingsRef.current.openSettingsModal()
  }

  function handleSaveProfile() {
    if (name === '') return Alert.alert('Ops', `Insira o nome do seu bixinho`)
    if (!image) return Alert.alert('Ops', `Insira a foto do seu bixinho`)
    if (adjective === '') return Alert.alert('Ops', `Insira o adjetivo do seu bixinho`)
    if (description === '') return Alert.alert('Ops', `Insira a descrição do seu bixinho`)
    
    registerPet({ name, photo: image, type, sex, age, adjective, description })

  }
 
  return (
    <Container>
      <SettingsModal ref={SettingsRef} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {image ? (
          <Image source={{ uri: image }} />
        ) : (
          <PickImageView onPress={pickImage}>
            <Feather name="image" size={30} />
          </PickImageView>
        )}
        <Name value={name} onChangeText={setName} />
        <SettingsButton onPress={handleOpenSettingsModal}>
          <Feather name="settings" size={30} color="black" />
        </SettingsButton>
        <Form>
          <Field onPress={handleToggleType}>
            <FieldValue>{type}</FieldValue>
          </Field>
          <Row>
            <Field onPress={handleToggleSex}>
              <FieldValue>{sex}</FieldValue>
            </Field>
            <Separator />
            <TextInputField onChangeText={e => setAge(Number(e))} value={String(age)} />
          </Row>
              
          <Label>O adjetivo certo para {name}</Label>
          <Input value={adjective} onChangeText={setAdjective} placeholder='Brincalhão' />

          <Label>Um pouco sobre {name}</Label>
          <TextArea value={description} onChangeText={setDescription} placeholder='Passa a maior parte do dia brincando e se divertindo!' />

          <Button onPress={handleSaveProfile} title='Salvar alterações' />
        </Form>
      </ScrollView>

    </Container>
  )
}