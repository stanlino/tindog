import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native'

import { usePet } from '../../hooks/pet'
import { Container } from '@components/Container'

import { SvgStack } from './components/svgStack'

import { 
  Title,
  MatchView,
  Avatar,
  Side,
  Name,
  Touchable,
  Text
} from './styles'

interface Match {
  id: string
  interestingID: string
  interestingName: string
  interestingPhoto: string
  interestedID: string
  interestedName: string
  interestedPhoto: string
  itsAMatch: boolean
}

export function Matches(){

  const { currentPet } = usePet()

  const [matchs, setMatchs] = useState([] as Match[])
  const [isLoading, setIsLoading] = useState(false)

  async function getMatchs() {

    setIsLoading(true)

    const imInterested = await firestore().collection('matchs').where('interestedID', '==', currentPet.id).where('itsAMatch', '==', true).get()
    const imInteresting = await firestore().collection('matchs').where('interestingID', '==', currentPet.id).where('itsAMatch', '==', true).get()
    
    const matchDocs: Match[] = []

    imInterested.forEach(doc => {
      matchDocs.push({ ...doc.data(), id: doc.id } as Match)
    })

    imInteresting.forEach(doc => {
      matchDocs.push({ ...doc.data(), id: doc.id } as Match)
    })

    setMatchs(matchDocs)
    setIsLoading(false)
  }

  useEffect(() => {
    getMatchs()
  },[])

  return (
    <Container>
      <Title>match's</Title>
      <SvgStack />
      <FlatList 
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 80
        }}
        refreshing={isLoading}
        onRefresh={getMatchs}
        data={matchs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {

          const imTheInterested = item.interestedID === currentPet.id

          return (
            <MatchView style={{ elevation: 5 }}>
              <Avatar source={{ uri: imTheInterested ? item.interestingPhoto : item.interestedPhoto }} />
              <Side>
                <Name>{imTheInterested ? item.interestingName : item.interestedName}</Name>
                <Touchable>
                  <Text>Visualizar perfil</Text>
                </Touchable>
              </Side>
            </MatchView>
          )
        }}
      />
    </Container>
  )
}