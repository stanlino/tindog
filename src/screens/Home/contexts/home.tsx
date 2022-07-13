import React, { 
  createContext, 
  ReactNode, 
  useCallback, 
  useContext, 
  useEffect, 
  useRef, 
  useState 
} from 'react'

import Swiper from 'react-native-deck-swiper'
import BottomSheet from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

import { usePet, Pet } from '../../../hooks/pet_document'

import { fetchProfiles } from '../utils/firestore'

type Scope = 'city' | 'state' | 'all'

interface HomeContextData {
  petProfiles: Pet[]
  currentProfileIndex: number
  changeCurrentProfileIndex: (index: number) => void
  isLoading: boolean
  scope: Scope
  changeScope: (scope: Scope) => void
  swiperRef: React.RefObject<Swiper<Pet>>
  bottomSheetRef: React.RefObject<BottomSheetMethods>
}

const HomeContext = createContext<HomeContextData>({} as HomeContextData)

interface HomeProvider {
  children: ReactNode
}

export function HomeProvider({ children } : HomeProvider){

  const { pets, currentPet, visualizedProfiles } = usePet()

  const [petProfiles, setPetProfiles] = useState([] as Pet[])
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [scope, setScope] = useState<Scope>('city')

  const swiperRef = useRef<Swiper<Pet>>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)

  const excludedProfiles = visualizedProfiles.concat(pets.map(pet => pet.id!))

  const changeCurrentProfileIndex = useCallback((index: number) => {
    setCurrentProfileIndex(index)
  },[])

  const changeScope = useCallback((scope: Scope) => {
    setScope(scope)
  },[])

  useEffect(() => {

    async function getPets() {

      setIsLoading(true)

      const pets = await fetchProfiles(
        currentPet.species,
        currentPet.sex === 'male' ? 'female' : 'male',
        {
          city: currentPet.city,
          state: currentPet.state
        },
        scope,
        excludedProfiles
      )
      
      setCurrentProfileIndex(0)
      setPetProfiles(pets)
      setIsLoading(false)
    }

    getPets()

  },[scope]) 

  return (
    <HomeContext.Provider value={{
      petProfiles,
      currentProfileIndex,
      changeCurrentProfileIndex,
      isLoading,
      scope,
      changeScope,
      bottomSheetRef,
      swiperRef
    }}>
      {children}
    </HomeContext.Provider>
  )
}

export function useHomeContext() {
  const context = useContext(HomeContext)
  return context
}