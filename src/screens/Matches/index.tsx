import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native'
const AnimatedLottieView = require("lottie-react-native");
import { RFPercentage } from 'react-native-responsive-fontsize'

import { usePet } from '../../hooks/pet'
import { Container } from '@components/Container'

import { Profile } from './components/petProfile'

import { 
  Title,
  TopDetail,
  Content,
  Output
} from './styles'

type MatchData = {
  id: string
  pets: string[]
  itsAMatch: boolean
  contacts: string[]
}

export function Matches(){

  const { currentPet } = usePet()

  const [matchs, setMatchs] = useState([] as MatchData[])
  const [isLoading, setIsLoading] = useState(true)

  async function getMatchs() {

    setIsLoading(true)

    const allMatchsQuery = await firestore()
      .collection('matchs')
      .where('pets', 'array-contains', currentPet.id!)
      .where('itsAMatch', '==', true)
      .get()
    
    const allMatchs: MatchData[] = []

    allMatchsQuery.docs.forEach(doc => {
      allMatchs.push({ ...doc.data(), id: doc.id } as MatchData)
    })

    setMatchs(allMatchs)
    setIsLoading(false)
  }

  useEffect(() => {
    getMatchs()
  },[])

  return (
    <Container>
      <TopDetail />
      <Title>Combinações</Title>
      {
        isLoading ?
          <Content>
            <AnimatedLottieView
              source={require('@assets/lottie/cat-loading.json')}
              style={{
                width: RFPercentage(40),
              }}
              autoPlay
              loop
              speed={2}
            />
          </Content>
        : 
        <FlatList 
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 80
          }}
          refreshing={isLoading}
          onRefresh={getMatchs}
          data={matchs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Profile item={item} currentPet={currentPet} />}
          ListEmptyComponent={() => {
            return (
              <Content>
                <AnimatedLottieView
                  source={require('@assets/lottie/dog-sleeping.json')}
                  style={{
                    width: RFPercentage(40),
                  }}
                  autoPlay
                  loop
                  speed={0.5}
                />
                <Output>
                  Por enquanto não temos combinações :(
                </Output>
              </Content>
            )
          }}
        />
      }
    </Container>
  )
}