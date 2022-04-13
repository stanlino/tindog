import React, { 
  forwardRef, 
  ForwardRefRenderFunction, 
  useEffect, 
  useImperativeHandle, 
  useState
} from 'react'

import { Alert, Keyboard, Modal, ScrollView, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { useFirestore } from '../../hooks/firestore';

import { 
  Wrapper,
  Form,
  Row,
  Label,
  Separator,
  UserLocation,
  Container,
  Title
} from './styles'

export interface SettingsModalProps {
  openSettingsModal(): void
}

interface SettingsProps {}

const SettingsModal: ForwardRefRenderFunction<SettingsModalProps, SettingsProps> = (
  props, 
  ref 
) => {

  const { createUserDoc, updateUserDoc, userDoc, signOut } = useFirestore()

  const [visible, setVisible] = useState(userDoc.userName ? false : true)
  const [keyboardIsShow, setKeyboardIsShow] = useState(false)

  const [userName, setUserName] = useState(userDoc.userName || '')
  const [userCEP, setUserCEP] = useState(userDoc.userCEP || '')
  const [userLocation, setUserLocation] = useState(userDoc.userLocation || '')

  function closeSettingsModal() {
    setVisible(false)
  }

  function openSettingsModal() {
    setVisible(true)
  }

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

    if (userDoc.userName) {
      updateUserDoc(userName, userLocation, userCEP)
    } else {
      createUserDoc(userName, userLocation, userCEP)
    }
    
    closeSettingsModal()
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

  useImperativeHandle(ref, () => ({
    openSettingsModal
  }))

  return (
    <Modal onRequestClose={closeSettingsModal} transparent animationType='slide' visible={visible}>
      <Wrapper>
        <Container>
          <ScrollView>
            <Row>
              <Title>Configurações</Title>

              <TouchableOpacity onPress={closeSettingsModal}>
                <AntDesign name="closecircleo" size={30} color="black" />
              </TouchableOpacity>
            </Row>

            <Form>
              <Label>Seu nome</Label>
              <Input autoCorrect={false} value={userName} onChangeText={setUserName} autoCapitalize='words' placeholder='Fulano Ciclano' />

              <Label>Seu CEP</Label>
              <Input maxLength={9} value={userCEP} onChangeText={handleSetCEP} keyboardType='number-pad' placeholder='xxxxx xxx' />
              <UserLocation>
                {userLocation != 'undefined - undefined' ? userLocation : 'CEP inexistente!'}
              </UserLocation>
            </Form>
          </ScrollView>
          {
            !keyboardIsShow && (
              <>
                <Button title="Realizar logout" onPress={handleSignOut} />
                <Separator />
                <Button onPress={handleUpdateUser} title='Salvar dados' disabled={
                  userLocation === userDoc.userLocation &&
                  userName === userDoc.userName &&
                  userCEP === userDoc.userCEP
                } />
              </>
            )
          }
        </Container>
      </Wrapper>
    </Modal>
  )
}

export default forwardRef(SettingsModal)
