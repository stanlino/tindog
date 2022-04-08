import * as Yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '@components/Button'
import { TextAreaInput, TextInput } from './appetizer';

import { Pet } from '../../../hooks/pet'

import {
  Container,
  Row,
  Touchable,
  TouchableText,
  Label,
} from './styles'

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Você precisa informar o nome da fera 🐶!'),
  // age: Yup
  //   .number()
  //   .required('Vish... É do tipo que mente a idade né... Vai, conta pra mim o ano de nascimento do bixo 🐈!'),
  adjective: Yup
    .string()
    .required('Os pretendentes precisam ter uma palavra pra ficar pensando antes de dormir! Infome um adjetivo pro seu bixinho 🦎!'),
  description: Yup
    .string()
    .required('Essa é a parte mais importante! Sei que você é suspeito pra falar mas conta pra mim como seu pet é 👉👈')
})

interface FormData {
  [name: string]: any;
}

interface FormProps {
  currentPet: Pet
  handleToggleType(): void
  type: string
  handleToggleSex(): void
  sex: string
  handleUpdateProfile(form: FormData): void
}

export function Form({ 
  currentPet,
  handleToggleSex,
  handleToggleType,
  sex,
  type,
  handleUpdateProfile
} : FormProps) {

  const { 
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  return (
    <Container>
      <TextInput 
        defaultValue={currentPet?.name} 
        control={control} 
        name='name' 
        editable={!currentPet?.id}
        error={errors.name && errors.name.message} 
        placeholder='Nome' 
      />
      <Row>
        <Touchable disabled={currentPet?.id != null} onPress={handleToggleType}>
          <TouchableText>{type}</TouchableText>
        </Touchable>
        <Touchable disabled={currentPet?.id != null} onPress={handleToggleSex}>
          <TouchableText>{sex}</TouchableText>
        </Touchable>
      </Row>
          
      <Label>O adjetivo certo para {currentPet?.name ?? 'xxxx'}</Label>
      <TextInput 
        defaultValue={currentPet?.adjective} 
        control={control} 
        name='adjective' 
        error={errors.adjective && errors.adjective.message} 
        placeholder='Bobão' 
      />
      
      <Label>Um pouco sobre {currentPet?.name ?? 'xxxx'}</Label>
      <TextAreaInput 
        defaultValue={currentPet?.description} 
        control={control} 
        name='description' 
        error={errors.description && errors.description.message} 
        textAlignVertical='top' 
        placeholder='Passa a maior parte do dia brincando e se divertindo!' 
      />

      <Button 
        style={{ marginTop: 15, marginBottom: 80 }} 
        title='Salvar alterações' 
        onPress={handleSubmit(handleUpdateProfile)} 
      />
    </Container>
  )
}