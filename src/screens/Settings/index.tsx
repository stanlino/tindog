import React, { 
  useEffect, 
  useState
} from 'react'

import { Alert, Keyboard, ScrollView, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { useUserDocument } from '../../hooks/user_document';
import { useAuth } from '../../hooks/auth';

import { SettingsScreenProps } from 'src/types/routes';

import { 
  Form,
  Row,
  Label,
  UserLocation,
  Container,
} from './styles'

export function Settings({ navigation } : SettingsScreenProps) {

  const { updateUserDocument, userDocument } = useUserDocument()
  const { signOut } = useAuth()

  const [keyboardIsShow, setKeyboardIsShow] = useState(false)

  const [userName, setUserName] = useState(userDocument.user_name || '')
  const [userCEP, setUserCEP] = useState(userDocument.user_cep || '')
  const [userLocation, setUserLocation] = useState(userDocument.user_location || '')

  function handleSetCEP(text: string) {
    if (userCEP.length >= 5) {
      setUserCEP(text.replace(/^(\d{5})(\d)/, "$1 $2"))
    } else {
      setUserCEP(text)
    }
  }

  async function handleUpdateUser() {
    if (userName.length < 3) return Alert.alert('Opa', 'Insira um nome com pelo menos 3 caracteres!')
    if (userLocation === 'undefined - undefined') return Alert.alert('Opa', 'Insira um CEP válido')
    if (userCEP.length !== 9) return Alert.alert('Opa', 'Insira um CEP válido')

    updateUserDocument({
      user_name: userName,
      user_cep: userCEP,
      user_location: userLocation
    })
    
  }

  function handleSignOut() {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair da conta?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', style: 'destructive', onPress: signOut }
    ], { cancelable: true })
  }

  useEffect(() => {
    if (userCEP.length === 9) {
      fetch(`https://brasilapi.com.br/api/cep/v2/${userCEP.replace(/[^\d]/g, "")}`)
        .then(response => response.json())
        .then(data => {
          setUserLocation(`${data.city} - ${data.state}`)
        })
    }
  },[userCEP.length === 9])

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShow(true)
    })

    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShow(false)
    })
  },[])

  return (
    <Container>
      <ScrollView>
        <Row>
          <TouchableOpacity onPress={handleSignOut}>
            <AntDesign name="poweroff" size={40} color="red" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <AntDesign name="arrowdown" size={40} color="#000" />
          </TouchableOpacity>
        </Row>

        <Form>
          <Label>Seu nome</Label>
          <Input editable autoCorrect={false} value={userName} onChangeText={setUserName} autoCapitalize='words' placeholder='Fulano Ciclano' />

          <Label>Seu CEP</Label>
          <Input editable maxLength={9} value={userCEP} onChangeText={handleSetCEP} keyboardType='number-pad' placeholder='xxxxx xxx' />
          <UserLocation>
            {userLocation != 'undefined - undefined' ? userLocation : 'CEP inexistente!'}
          </UserLocation>
        </Form>
      </ScrollView>
      {
        !keyboardIsShow && (
          <Button onPress={handleUpdateUser} title='Salvar dados' disabled={
            userLocation === userDocument.user_location &&
            userName === userDocument.user_name &&
            userCEP === userDocument.user_cep}
          />
        )
      }
    </Container>
  )
}
