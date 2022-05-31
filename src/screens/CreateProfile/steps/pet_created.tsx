import { usePet } from '@hooks/pet_document'
import I18n from 'i18n-js'
import AnimatedLottieView from 'lottie-react-native'
import { MotiView, AnimatePresence } from 'moti'
import React, { useEffect, useState } from 'react'
import { useAddPet } from '../hooks/create_pet'
import { Container } from './container'
import { SuperSpan } from './styles'

export function PetCreated(){

  const { photo, species, name, sex, description, birthDate, updatePropertties, petCreated } = useAddPet()
  const { createPet } = usePet()

  useEffect(() => {
    createPet({
      photo,
      species,
      name,
      sex,
      description,
      birthDate
    }).then(() => {
      updatePropertties({
        petCreated: true
      })
    })
  },[])
  
  return (
    <Container>
      {/*@ts-ignore @types/react problem*/}
      <AnimatePresence exitBeforeEnter>
        {!petCreated && (
          <MotiView 
            key='loading' 
            from={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{
              type: 'timing',
              duration: 500
            }}
          >
            <AnimatedLottieView 
              source={require('@assets/lottie/cat-loading.json')}
              autoPlay
              loop
              style={{
                width: '70%',
                alignSelf: 'center',
                marginBottom: 10
              }}
            />
            <SuperSpan>{I18n.t('new_profile_pet_created_loading_span')}</SuperSpan>
          </MotiView>
        )} 
        {petCreated && (
          <MotiView 
            key='ready' 
            from={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{
              type: 'timing',
              duration: 500
            }}
          >
            <AnimatedLottieView 
              source={require('@assets/lottie/cat-in-box')}
              autoPlay
              loop
              speed={.5}
              style={{
                width: '70%',
                alignSelf: 'center',
                marginBottom: 10
              }}
            />
            <SuperSpan>{I18n.t('new_profile_pet_created_loading_finish_span')}</SuperSpan>
          </MotiView>
        )}
      </AnimatePresence>
    </Container>
  )
}