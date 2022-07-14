import React, { useCallback } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { RoundTouchable } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { useHomeContext } from '@screens/Home/contexts/home';

export function ChangeScopeButton(){

  const { bottomSheetRef } = useHomeContext()

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand()
  }, [])
  
  return (
    <RoundTouchable onPress={openBottomSheet}>
      <MaterialCommunityIcons name="map-search" size={RFValue(20)} color="purple" />
    </RoundTouchable>
  )
}