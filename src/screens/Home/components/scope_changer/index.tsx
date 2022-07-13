import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { Option, Title, Text } from './styles';
import { useHomeContext } from '@screens/Home/contexts/home';
import { BackHandler } from 'react-native';
import I18n from 'i18n-js';

type BottomSheetState = 'CLOSED' | 'OPENED'

export function ScopeChanger(){

  const [ bottomSheetState, setBottomSheetState ] = useState<BottomSheetState>('CLOSED')

  const {
    bottomSheetRef,
    scope,
    changeScope
  } = useHomeContext()

  const snapPoints = useMemo(() => ['30%'], [])

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) return setBottomSheetState('CLOSED')

    return setBottomSheetState('OPENED')
  }, []);

  useEffect(() => {
      
    const backAction = () => {
      if (bottomSheetState === 'OPENED') {
        closeBottomSheet()
        return true
      }

      return false
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()

  },[bottomSheetState])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      onChange={handleSheetChanges}
    >
      <BottomSheetView>
        <Title>{I18n.t('change_scope_title')}</Title>
      </BottomSheetView>
      <Option onPress={() => changeScope('city')}>
        <Text>{I18n.t('change_scope_1')}</Text>
        {scope === 'city' && <MaterialCommunityIcons name="radiobox-marked" size={24} color="black" />}
      </Option>
      <Option onPress={() => changeScope('state')}>
        <Text>{I18n.t('change_scope_2')}</Text>
        {scope === 'state' && <MaterialCommunityIcons name="radiobox-marked" size={24} color="black" />}
      </Option>
      <Option onPress={() => changeScope('all')}>
        <Text>{I18n.t('change_scope_3')}</Text>
        {scope === 'all' && <MaterialCommunityIcons name="radiobox-marked" size={24} color="black" />}
      </Option>
    </BottomSheet>
  )
}