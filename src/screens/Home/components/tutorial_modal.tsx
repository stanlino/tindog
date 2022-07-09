import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Button, Dimensions, FlatList, Modal, Text, View } from 'react-native'
import I18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Touch from '@assets/lottie/touch.json'
import SwipeToLeft from '@assets/lottie/swipe_to_left.json'
import SwipeToRight from '@assets/lottie/swipe_to_right.json'
import { StatusBar } from 'expo-status-bar';
import { ContainerModal, Content, ContentModal, ContentText, ContentTitle, Row } from './styles';

const { width: screenWidth } = Dimensions.get('screen')

export function Tutorial(){

  const [visible, setVisible] = useState(false)
  const [currentPage, setCurrenPage] = useState(0)

  const FlatListRef = useRef<FlatList>(null)

  useEffect(() => {
    async function storeData() {
      try {
        const value = await AsyncStorage.getItem('@tindog_tutorial_state')
        if (!value) {
          setVisible(true)
        } 
      } catch {
        null
      }
    }

    storeData()
  },[])

  const data = [
    { text: I18n.t('tutorial_step_1'), key: '1' },
    { text: I18n.t('tutorial_step_2'), key: '2' },
    { text: I18n.t('tutorial_step_3'), key: '3' }
  ]

  async function scrollToNextPage() {
    if (currentPage < 2) {
      FlatListRef.current?.scrollToIndex({ index: currentPage + 1, animated: true })
      setCurrenPage(prevState => prevState += 1)
    } else {
      setVisible(false)
      await AsyncStorage.setItem('@tindog_tutorial_state', 'READ')
    }
  }

  return (
    <Modal transparent visible={visible} animationType='fade'>
      <StatusBar backgroundColor='#fff6' />
      <ContainerModal>
        <FlatList 
          data={data}
          keyExtractor={item => item.key}
          horizontal
          snapToInterval={screenWidth}
          pagingEnabled={true}
          decelerationRate='fast'
          scrollEnabled={false}
          ref={FlatListRef}
          renderItem={({ item }) => {
            return (  
              <ContentModal>
                <Content style={{ 
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 4,
                    height: 4
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 4.5,
                  elevation: 1
                }}>
                  <ContentTitle>{I18n.t('tutorial_title')}</ContentTitle>
                  <AnimatedLottieView 
                    source={item.key === '1' ? Touch : item.key === '2' ? SwipeToLeft : SwipeToRight}
                    autoPlay
                    loop
                    style={{
                      width: RFPercentage(40),
                    }}
                  />
                  <ContentText>{item.text}</ContentText>
                </Content>
                <Row>
                  <Button 
                    onPress={scrollToNextPage} 
                    title={currentPage < 2 ? I18n.t('next') : I18n.t('close')}
                    color={'#5e2525'}
                  />
                </Row>
              </ContentModal>
            )
          }}
        />
      </ContainerModal>
    </Modal>
  )
}