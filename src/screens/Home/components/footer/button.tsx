import React, { useCallback } from 'react'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { InvisibleTouchable, Link, RoundTouchable } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { useHomeContext } from '@screens/Home/contexts/home';
import I18n from 'i18n-js';

interface ChangeScopeButtonProps {
  link?: boolean
}

export function ChangeScopeButton({ link = false }: ChangeScopeButtonProps){

  const { bottomSheetRef } = useHomeContext()

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand()
  }, [])

  if (link) {
    return (
      <InvisibleTouchable onPress={openBottomSheet}>
        <Feather name="map-pin" size={20} color="purple" />
        <Link>{I18n.t('change_scope')}</Link>
      </InvisibleTouchable>
    )
  }
  
  return (
    <RoundTouchable onPress={openBottomSheet}>
      <MaterialCommunityIcons name="map-search" size={RFValue(20)} color="purple" />
    </RoundTouchable>
  )
}