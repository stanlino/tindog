import React, { useCallback, useEffect, useState } from 'react'
import { Alert, ScrollView, StatusBar } from 'react-native'

import { Header } from './components/header';
import { Form } from './components/form';

import { ProfileScreenProps } from '../../types/routes';

import { usePet } from '../../hooks/pet_document';
import { useUserDocument } from '../../hooks/user_document';


import { 
  Container,
} from './styles'

interface FormData {
  [name: string]: any;
}

export function Profile({ navigation } : ProfileScreenProps){

  const { currentPet, createPet, updatePetDescription, updatePetPhotoInState } = usePet()
  const { userDocument } = useUserDocument()

  const [photo, setPhoto] = useState(currentPet?.photo)
  const [species, setSpecies] = useState(currentPet?.species ?? 'dog')
  const [sex, setSex] = useState(currentPet?.sex ?? 'male')

  const handleToggleSex = useCallback(() => {
    setSex(sex => sex === 'female' ? 'male' : 'female')
  }, [])

  const handleToggleSpecies = useCallback(() => {
    setSpecies(sex => sex === 'dog' ? 'cat' : 'dog')
  }, [])

  function handleSetImage(imageUrl: string) {
    setPhoto(imageUrl)
  }

  async function updateProfile(form: FormData) {
    if (currentPet?.id) {
      await updatePetDescription(form.description)
    } else {
      await createPet({
        name: form.name,
        photo,
        sex,
        species,
        description: form.description,
      })
      navigation.navigate('home')
    }
  }

  function handleUpdateProfile(form: FormData) {
    if (!photo) return Alert.alert('Ops', 'Não se esqueça de adicionar uma foto pra iluminar o perfil ☀️')
    if (currentPet?.id){
      return updateProfile(form)
    }
    return Alert.alert('Aviso!', 'Os campos de adjetivo e descrição são editáveis e você pode alterar sempre que desejar, os demais são permanentes! (Nome, Sexo, Espécie) ', [
      { text: 'Cancelar' },
      { text: 'Prosseguir', onPress: () => updateProfile(form)}
    ])
  }
 
  useEffect(() => {
    if (!userDocument.user_name) {
      setTimeout(() => {
        navigation.navigate('settings')
      }, 100);
    }
  },[userDocument.user_name])

  return (
    <Container>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={'#0003'}/>

      <ScrollView showsVerticalScrollIndicator={false}>  
        <Header 
          updatePetPhotoInState={updatePetPhotoInState} 
          currentPet={currentPet} 
          image={photo} 
          handleSetImage={handleSetImage} 
        />
        <Form 
          currentPet={currentPet} 
          handleToggleSex={handleToggleSex}
          handleToggleType={handleToggleSpecies}
          sex={sex}
          type={species}
          handleUpdateProfile={handleUpdateProfile}
        />
      </ScrollView>
    </Container>
  )
}