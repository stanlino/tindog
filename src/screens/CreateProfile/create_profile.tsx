import React, { useState } from 'react'
import StepIndicator from 'react-native-step-indicator'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { AnimatePresence } from 'moti'
import { StackActions, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { AppRoutesParams } from '@types_/routes'

import { Container } from '@components/Container'
import { SmallButton } from '@components/SmallButton'
import { Button } from '@components/Button'

import { AnimatedBackground } from './components/animated_background'

import { useAddPet } from './hooks/create_pet'

import { SetPetName } from './steps/set_pet_name'
import { SetPetImage } from './steps/set_pet_image'
import { SetPetSpecies } from './steps/set_pet_species'
import { SetPetSex } from './steps/set_pet_sex'
import { SetPetAge } from './steps/set_pet_age'
import { SetPetDescription } from './steps/set_pet_description'
import { ConfirmPetCreation } from './steps/confirm_pet_creation'
import { PetCreated } from './steps/pet_created'

import {
  Wrapper,
  Title,
  StepIndicatorWrapper,
  ProgressItem,
  Body,
  Footer,
  Flex
} from './styles'

type Step = {
  name: string
  icon: keyof typeof FontAwesome.glyphMap
  Component: React.FC
  canGoNextStep: boolean | string | Date
}

export function CreateProfile(){

  const { dispatch } = useNavigation<StackNavigationProp<AppRoutesParams, 'create_profile'>>()

  const petPropertties = useAddPet()

  const progressSteps: Step[] = [
    {name: 'foto', icon: 'image', Component: SetPetImage, canGoNextStep: petPropertties.photo},
    {name: 'espécie', icon: '500px', Component: SetPetSpecies, canGoNextStep: petPropertties.species},
    {name: 'nome', icon: 'edit', Component: SetPetName, canGoNextStep: petPropertties.name},
    {name: 'sexo', icon: 'intersex', Component: SetPetSex, canGoNextStep: petPropertties.sex},
    {name: 'idade', icon: 'sort-numeric-asc', Component: SetPetAge, canGoNextStep: petPropertties.birthDate},
    {name: 'descrição', icon: 'file-text-o', Component: SetPetDescription, canGoNextStep: petPropertties.description?.length > 20},
    {name: 'confirmação', icon: 'warning', Component: ConfirmPetCreation, canGoNextStep: true},
    {name: 'concluído', icon: 'check', Component: PetCreated, canGoNextStep: petPropertties.petCreated}
  ]

  const [currentStep, setCurrentStep] = useState(0)

  function handleNextStep() {
    if (currentStep === progressSteps.length - 1) {
      return dispatch(StackActions.replace('home'))
    }

    setCurrentStep(prevState => prevState + 1)
  } 

  function handlePrevStep() {
    if (currentStep === 0) return

    setCurrentStep(prevState => prevState - 1)
  } 

  return (
    <Container>
      <AnimatedBackground />
      <Wrapper>
        <Title>{progressSteps[currentStep].name}</Title>
        <StepIndicatorWrapper>
          <StepIndicator 
            currentPosition={currentStep}
            stepCount={progressSteps.length}
            direction='horizontal'
            customStyles={{
              stepIndicatorSize: 30,
              currentStepIndicatorSize: 30,
              currentStepStrokeWidth: 2,
              labelSize: 12,
              separatorFinishedColor: '#333b89',
              stepStrokeFinishedColor: '#333b89',
              stepIndicatorFinishedColor: '#333b89',
              stepStrokeUnFinishedColor: '#333b89',
              stepIndicatorLabelUnFinishedColor: '#333b89',
              separatorUnFinishedColor: '#fff',
              stepStrokeCurrentColor: '#333b89',
              stepIndicatorUnFinishedColor: '#fff',
              stepIndicatorCurrentColor: '#333b89',
            }}
            renderStepIndicator={({ position }) => (
              <ProgressItem>
                {position === 1 
                ? <MaterialIcons name='pets' color={position <= currentStep ? '#fff' : '#000'} /> 
                : <FontAwesome name={progressSteps[position].icon} color={position <= currentStep ? '#fff' : '#000'} />}
              </ProgressItem>
            )}
          />
        </StepIndicatorWrapper>
        <Body>
          {/*@ts-ignore @types/react problem*/}
          <AnimatePresence exitBeforeEnter>
            {progressSteps.map((item, index) => {
              if (index === currentStep) {
                const Component = item.Component
                return (
                  <Component key={item.name} />
                )
              }
            })}
          </AnimatePresence>
        </Body>
      </Wrapper>
      <Footer>
        {currentStep > 0 && currentStep < progressSteps.length - 1 && 
          <>
            <SmallButton color='#333b89' onPress={handlePrevStep}>
              <MaterialIcons name='arrow-left' size={40} color='#fff' />
            </SmallButton>
            <Flex />
          </>
        }
        <Button 
          disabled={!progressSteps[currentStep].canGoNextStep} 
          title='Avançar' 
          onPress={handleNextStep}
        />
      </Footer>
    </Container>
  )
}