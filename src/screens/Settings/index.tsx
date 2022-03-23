import React, { 
  forwardRef, 
  ForwardRefRenderFunction, 
  useImperativeHandle, 
  useState
} from 'react'

import auth from "@react-native-firebase/auth";

import { Alert, Modal, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 

import { Container } from '@components/Container'
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { 
  Wrapper,
  Form,
  Row,
  Label,
  Separator
} from './styles'

export interface SettingsModalProps {
  openSettingsModal(): void
}

interface SettingsProps {
  default: boolean
}

const SettingsModal: ForwardRefRenderFunction<SettingsModalProps, SettingsProps> = (
  props, 
  ref 
) => {

  const [visible, setVisible] = useState(props.default || false)

  const [userName, setUserName] = useState('')
  const [userCEP, setUserCEP] = useState('')
  const [userLocation, setUserLocation] = useState('')

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

  function handleSignOut() {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair da conta?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', style: 'destructive', onPress: () => auth().signOut() }
    ], { cancelable: true })
  }

  useImperativeHandle(ref, () => ({
    openSettingsModal
  }))

  return (
    <Modal onRequestClose={closeSettingsModal} transparent animationType='slide' visible={visible}>
      <Wrapper>
        <Container>
          <Row>
            <TouchableOpacity onPress={closeSettingsModal}>
              <AntDesign name="closecircleo" size={30} color="black" />
            </TouchableOpacity>
          </Row>

          <Form>
            <Label>Seu nome</Label>
            <Input autoCorrect={false} value={userName} onChangeText={setUserName} autoCapitalize='words' placeholder='Fulano Ciclano' />

            <Label>Seu CEP</Label>
            <Input value={userCEP} onChangeText={handleSetCEP} keyboardType='number-pad' placeholder='xxxxx xxx' />
          </Form>

          <Button title="Realizar logout" onPress={handleSignOut} />
          <Separator />
          <Button title="Prosseguir" />
        </Container>
      </Wrapper>
    </Modal>
  )
}

export default forwardRef(SettingsModal)