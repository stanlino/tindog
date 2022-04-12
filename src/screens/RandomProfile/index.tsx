import React from 'react'
import { SharedElement } from 'react-navigation-shared-element'

import { Container } from '@components/Container'
import { RandomProfileScreenProps } from 'src/types/routes'

import { 
  Image,
  ImageWrapper, 
  ProfileAdjective, 
  ProfileInfo,
  ProfileName,
  Description,
  DText,
  TopDetail
} from './styles'

export function RandomProfile({ navigation, route: { params } } : RandomProfileScreenProps){

  const pet = params.pet

  return (
    <Container>

      <TopDetail />

      <ImageWrapper style={{ elevation: 5 }}>
        {
          params.sharedElement ? (
            <SharedElement id={pet.id!}>
              <>
                <Image source={{ uri: pet.photo!}} />
                <ProfileInfo>
                  <ProfileName>{pet.name}</ProfileName>
                  <ProfileAdjective>{pet.adjective}</ProfileAdjective>
                </ProfileInfo>
              </>
            </SharedElement>
          ) : (
            <>
              <Image source={{ uri: pet.photo!}} />
              <ProfileInfo>
                <ProfileName>{pet.name}</ProfileName>
                <ProfileAdjective>{pet.adjective}</ProfileAdjective>
              </ProfileInfo>
            </>
          )
        }
      </ImageWrapper>

      <Description style={{ elevation: 5 }}>
        <DText>
          {pet.description}
        </DText>
      </Description>

    </Container>
  )
}