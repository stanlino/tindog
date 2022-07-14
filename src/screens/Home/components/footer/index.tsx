import React, { useCallback } from 'react'
import I18n from 'i18n-js'
import { FontAwesome } from '@expo/vector-icons'; 

import { usePet } from '@hooks/pet_document'
import { useHomeContext } from '@screens/Home/contexts/home'
import { ChangeScopeButton } from './button'
import { ActionButton } from './action_button'

import {
  Box,
  Container,
  RoundTouchable,
  Span
} from './styles'

function HandleFooter() {

  const { 
    isLoading, 
    petProfiles, 
    currentProfileIndex,
    swiperRef,
    scope
  } = useHomeContext()

  const { visualizedProfiles } = usePet()

  const emptyProfileList = !petProfiles[0] || currentProfileIndex === petProfiles.length
  const allProfilesViewed = visualizedProfiles.length > 0 && emptyProfileList

  const handleSwipeToLeft = useCallback(() => {
    swiperRef.current?.swipeLeft()
  }, [])

  const handleSwipeToRight = useCallback(() => {
    swiperRef.current?.swipeRight()
  }, [])

  if (isLoading) return <Span>{I18n.t('loading')}</Span>

  if (allProfilesViewed) return (
    <>
      <RoundTouchable>
        <FontAwesome name="history" size={20} color="purple" />
      </RoundTouchable>
      <Span>{scope === 'all' ? I18n.t('no_more_profiles_in_tindog') : I18n.t('no_more_profiles')}</Span>
      <ChangeScopeButton />
    </>
  )

  if (emptyProfileList) return (
    <>
      <RoundTouchable>
        <FontAwesome name="history" size={20} color="purple" />
      </RoundTouchable>
      <Span>{I18n.t('no_have_profiles')}</Span>
      <ChangeScopeButton />
    </>
  )

  return <>
    <RoundTouchable>
      <FontAwesome name="history" size={20} color="purple" />
    </RoundTouchable>
    <ActionButton type='reject' action={handleSwipeToLeft} />
    <ActionButton type='like' action={handleSwipeToRight} />
    <ChangeScopeButton />
  </>

}

export function Footer(){
  return (
    <Container>
      <HandleFooter />
    </Container>
  )
}