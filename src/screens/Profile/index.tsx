import React, { useCallback, useState } from 'react'
import { Alert, ScrollView, StatusBar } from 'react-native'

import { Header } from './components/header';
import { Form } from './components/form';
import { Loading } from '@components/Loading';

import { ProfileScreenProps } from '../../types/routes';

import { usePet } from '../../hooks/pet_document';

import { 
  Container,
} from './styles'

interface FormData {
  [name: string]: any;
}

export function Profile({ navigation } : ProfileScreenProps){

  const { currentPet, createPet, updatePetDescription, updatePetPhotoInState } = usePet()

  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    if (currentPet?.id) {
      await updatePetDescription(form.description)
      setLoading(false)
    } else {
      await createPet({
        name: form.name,
        photo,
        sex,
        species,
        description: form.description,
      })
      setLoading(false)
      navigation.navigate('home')
    }
  }

  function handleUpdateProfile(form: FormData) {
    if (!photo) return Alert.alert('Ops', 'Não se esqueça de adicionar uma foto pra iluminar o perfil ☀️')
    if (currentPet?.id){
      return updateProfile(form)
    }
    return Alert.alert('Aviso!', 'A descrição é editável e você pode alterar sempre que desejar, os demais são permanentes! (Nome, Sexo, Espécie)', [
      { text: 'Cancelar' },
      { text: 'Prosseguir', onPress: () => updateProfile(form)}
    ])
  }

  return (
    <Container>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={'#0003'}/>

      <Loading visible={loading} />

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