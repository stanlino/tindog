import React, { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState } from 'react'
import { Modal, ScrollView } from 'react-native'

import { Input } from '@components/Input';

import { Pet } from '../../hooks/pet';

import { 
  Container, 
  Content, 
  Image,
  Label,
  TextArea
} from './styles'

interface ProfileModalProps {
  pet: Pet
}

export interface ProfileModalMethods {
  handleOpenModal(): void
}

const ProfileModal: ForwardRefRenderFunction<ProfileModalMethods, ProfileModalProps> = (props, ref) => {

  const { pet } = props

  const [visible, setVisible] = useState(false)

  function handleOpenModal() {
    setVisible(true)
  }

  useImperativeHandle(ref, () => ({
    handleOpenModal
  }))

  return (
    <Modal visible={visible} transparent animationType='slide' onRequestClose={() => setVisible(false)}>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          <Image source={{ uri: pet.photo }} />

          <Content>

            <Input 
              defaultValue={pet.name} 
              editable={false}
            />
                
            <Label>O adjetivo certo para {pet.name ?? 'xxxx'}</Label>
            <Input 
              defaultValue={pet.adjective} 
              editable={false}
            />
            
            <Label>Um pouco sobre {pet.name ?? 'xxxx'}</Label>
            <TextArea 
              defaultValue={pet.description}
              textAlignVertical='top'
              multiline={true}
              editable={false}
              autoCorrect={false}           
            />
          </Content>

        </ScrollView>
      </Container>
    </Modal>
  )
}

export default forwardRef(ProfileModal)