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
  return (
    <Container>

      <TopDetail />

      <ImageWrapper style={{ elevation: 5 }}>
        <SharedElement id={params.id!}>
          <>
            <Image source={{ uri: params.photo!}} />
            <ProfileInfo>
              <ProfileName>{params.name}</ProfileName>
              <ProfileAdjective>{params.adjective}</ProfileAdjective>
            </ProfileInfo>
          </>
        </SharedElement>
      </ImageWrapper>

      <Description style={{ elevation: 5 }}>
        <DText>
          {params.description}
        </DText>
      </Description>

    </Container>
  )
}