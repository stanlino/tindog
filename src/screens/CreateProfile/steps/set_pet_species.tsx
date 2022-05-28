import AnimatedLottieView from 'lottie-react-native'
import React from 'react'

import { useAddPet } from '../hooks/create_pet'
import { Container } from './container'

import { 
  SmallTouchable,
  Row,
  Span
} from './styles'

type Species = 'dog' | 'cat'

export function SetPetSpecies(){

  const { species, updatePropertties } = useAddPet()

  function handleSetSpecies(species: Species) {
    updatePropertties({
      species
    })
  }

  return (
    <Container>
      <Span>De qual das espécies abaixo seu bixinho pertence?</Span>
      <Row>
        <SmallTouchable onPress={() => handleSetSpecies('dog')} selected={species === 'dog'}>
          <AnimatedLottieView 
            source={require('@assets/lottie/dog-run.json')}
            autoPlay
            loop
            style={{
              width: '100%',
            }}
            speed={0.5}
          />
        </SmallTouchable>
        <SmallTouchable onPress={() => handleSetSpecies('cat')} selected={species === 'cat'}>
          <AnimatedLottieView 
            source={require('@assets/lottie/cat-stop.json')}
            autoPlay
            loop
            style={{
              width: '100%',
            }}
            speed={0.5}
          />
        </SmallTouchable>
      </Row>
      <Span>{species === 'cat' ? 'Trata-se de um gato' : species === 'dog' ? 'Trata-se de um cachorro' : ''}</Span>
    </Container>
  )
}