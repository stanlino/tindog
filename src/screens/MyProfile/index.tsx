import React, { useCallback, useState } from 'react'
import { Alert, ScrollView } from 'react-native'

import { Header } from './components/header';
import { Form } from './components/form';

import { usePet } from '../../hooks/pet';

import { 
  Container,
} from './styles'

interface FormData {
  [name: string]: any;
}

export function MyProfile(){

  const { currentPet, registerPet, updatePet } = usePet()

  const [photo, setPhoto] = useState(currentPet?.photo)
  const [type, setType] = useState(currentPet?.type ?? 'dog')
  const [sex, setSex] = useState(currentPet?.sex ?? 'male')

  const handleToggleSex = useCallback(() => {
    setSex(sex => sex === 'female' ? 'male' : 'female')
  }, [])

  const handleToggleType = useCallback(() => {
    setType(sex => sex === 'dog' ? 'cat' : 'dog')
  }, [])

  function handleSetImage(imageUrl: string) {
    setPhoto(imageUrl)
  }

  function updateProfile(form: FormData) {
    if (currentPet?.id) {
      updatePet({
        adjective: form.adjective,
        description: form.description
      })
    } else {
      registerPet({
        name: form.name,
        photo,
        age: 0,
        sex,
        type,
        adjective: form.adjective,
        description: form.description,
      })
    }
  }

  function handleUpdateProfile(form: FormData) {
    if (!photo) return Alert.alert('Ops', 'Não se esqueça de adicionar uma foto pra iluminar o perfil ☀️')
    Alert.alert('Opa', 'Posso salvar o perfil?', [
      { text: 'Calma lá' },
      { text: 'Pode', onPress: () => updateProfile(form) },
      { text: 'Deve', onPress: () => updateProfile(form) }
    ])
  }
 
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>  
        <Header currentPet={currentPet} image={photo} handleSetImage={handleSetImage} />
        <Form 
          currentPet={currentPet} 
          handleToggleSex={handleToggleSex}
          handleToggleType={handleToggleType}
          sex={sex}
          type={type}
          handleUpdateProfile={handleUpdateProfile}
        />
      </ScrollView>
    </Container>
  )
}