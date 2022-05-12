import { 
  createContext, 
  ReactNode, 
  useContext, 
  useEffect, 
  useState 
} from "react";

import { useAuth } from "./auth";
import { useUserDocument } from "./user_document";

import { 
  createPetDocument, 
  fetchPetDocuments, 
  fetchProfilesAlreadyViewed, 
  updatePetDocument
} from "./utils/pet_firestore_functions";

export interface Pet {
  id?: string
  user_id?: string
  name: string
  photo: string
  location?: string
  species: 'dog' | 'cat'
  sex: 'female' | 'male'
  description: string
}

interface CurrentPetContextData {
  pets: Pet[]
  currentPet: Pet
  createPet(pet: Pet): Promise<void>
  updatePetDescription(description: string): Promise<void>
  updatePetPhotoInState(photo_url: string): void
  visualizedProfiles: string[]
  userHasAPet: boolean
  updateVisualizedProfiles(pet_id: string): void
}

const CurrentPetContext = createContext({} as CurrentPetContextData)

export function CurrentPetProvider({ children } : { children: ReactNode }) {

  const { user } = useAuth()
  const { userDocument } = useUserDocument()

  const [petsLoaded, setPetsLoaded] = useState(false)
  const [viewedProfilesLoaded, setViewedProfilesLoaded] = useState(false)

  const [pets, setPets] = useState<Pet[]>([] as Pet[])
  const [visualizedProfiles, setVisualizedProfiles] = useState<string[]>([]) 

  const [petIndex, setPetIndex] = useState(0)

  const currentPet = pets[petIndex]

  const userHasAPet = pets.length > 0

  useEffect(() => {
    async function fetchPets() {
      const petDocuments = await fetchPetDocuments(user.uid)
      if (!petDocuments) {
        return setPetsLoaded(true)
      }
      const petProfiles = petDocuments.docs.map(doc => ({ ...doc.data(), id: doc.id } as Pet))
    
      setPets(petProfiles)
      return setPetsLoaded(true)
    }

    fetchPets()
  },[])

  useEffect(() => {
    async function fetchVisualizedProfiles() {
      if (!currentPet?.id) {
        return setViewedProfilesLoaded(true)
      }

      const visualizedDocuments = await fetchProfilesAlreadyViewed(currentPet.id)
      if (!visualizedDocuments) return

      setVisualizedProfiles(visualizedDocuments.docs.map(doc => doc.id))
      
      return setViewedProfilesLoaded(true)
    }

    fetchVisualizedProfiles()
  },[currentPet])

  async function createPet(props: Pet) {
    if (currentPet?.id) return

    const pet_id = `${user.uid}-${pets.length}`

    const petDocument = await createPetDocument(user.uid, pet_id, userDocument.user_location, props)
    return setPets(oldPets => [...oldPets, {...petDocument, id: pet_id}])
  }

  async function updatePetDescription(description: string) {
    if (!currentPet.id) return
    await updatePetDocument(currentPet.id, description)

    const petsClone = pets.map(pet => ({ ...pet }))
    const findPet = petsClone.find(pet => pet.id === currentPet.id)

    if (!findPet) return

    findPet.description = description

    setPets(petsClone)
  }

  function updatePetPhotoInState(photo_url: string) {
    if (!currentPet.id) return

    const petsClone = pets.map(pet => ({ ...pet }))
    const findPet = petsClone.find(pet => pet.id === currentPet.id)

    if (!findPet) return

    findPet.photo = photo_url

    setPets(petsClone)
  }

  function updateVisualizedProfiles(pet_id: string) {
    setVisualizedProfiles(oldState => [...oldState, pet_id])
  }

  if (petsLoaded && viewedProfilesLoaded) {
    return (
      <CurrentPetContext.Provider value={{
        pets,
        currentPet,
        createPet,
        visualizedProfiles,
        userHasAPet,
        updatePetDescription,
        updatePetPhotoInState,
        updateVisualizedProfiles
      }}>
        { children }
      </CurrentPetContext.Provider>
    )
  }

  return null

  
}

export function usePet() {
  const context = useContext(CurrentPetContext)
  return context
}