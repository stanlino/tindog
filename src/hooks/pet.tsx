import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import AppLoading from 'expo-app-loading';

import { useAuth } from "./auth";
import { useFirestore } from "./firestore";
import { Alert } from "react-native";

interface UpdatePetProps {
  adjective: string
  description: string
}

export interface Pet {
  id?: string
  userUID?: string
  name: string
  photo: string
  age: number
  location?: string
  type: 'dog' | 'cat'
  sex: 'female' | 'male'
  adjective: string
  description: string,
}

interface PetContextData {
  pets: Pet[]
  currentPet: Pet
  registerPet(pet: Pet): void
  updatePet(pet: UpdatePetProps): void
  visualizedProfiles: string[]
  userHasAPet: boolean
  updateVisualizedProfiles(petId: string): void
}

const PetContext = createContext({} as PetContextData)

export function PetProvider({ children } : { children: ReactNode }) {

  const { user } = useAuth()
  const { userDoc } = useFirestore()

  const [recoveredPets, setRecoveredPets] = useState(false)
  const [recoveredVisualizedProfiles, setRecoveredVisualizedProfiles] = useState(false)

  const [pets, setPets] = useState<Pet[]>([] as Pet[])
  const [petIndex, setPetIndex] = useState(0)

  const currentPet = pets[petIndex]

  const userHasAPet = pets.length > 0

  const [visualizedProfiles, setVisualizedProfiles] = useState<string[]>([]) 

  useEffect(() => {
    firestore().collection('pets').where('userUID', '==', user?.uid).get()
      .then(docs => {
        if (!docs.empty) {
          const petDocs: Pet[] = []
          docs.forEach(doc => {
            doc.ref.collection('visualized').get()
              .then(profiles => {
                const VisualizedProfileDocs: string[] = []
                profiles.forEach(profile => {
                  VisualizedProfileDocs.push(profile.data().petUID as string)
                })
                setVisualizedProfiles(VisualizedProfileDocs)
              })
              .finally(() => setRecoveredVisualizedProfiles(true))
            petDocs.push({...doc.data(), id: doc.id} as Pet)
          })
          setPets(petDocs)
        } else setRecoveredVisualizedProfiles(true)
      })
      .finally(() => setRecoveredPets(true))
  },[])

  async function registerPet(props : Pet) {

    const petId = `${user?.uid}-${pets.length}`

    const storageReference = storage().ref(`pets/${petId}`)
    await storageReference.putFile(props.photo)
    const photoURl = await storageReference.getDownloadURL()

    const pet = {
      userUID: user?.uid,
      name: props.name,
      photo: photoURl,
      age: props.age,
      location: userDoc.userLocation,
      type: props.type,
      sex: props.sex,
      adjective: props.adjective,
      description: props.description,
    }

    firestore().collection('pets').doc(petId).set({
      ...pet
    }).then(() => {
      setPets(oldPets => [...oldPets, {...pet, id: petId}])
    }).catch(error => {
      Alert.alert('Ops', error)
    })
  }

  async function updatePet(props: UpdatePetProps) {

    const newPetObject: UpdatePetProps = {} as UpdatePetProps
    const petsClone = pets.map(pet => ({ ...pet }))
    const thisPet = petsClone.find(pet => pet.id === currentPet.id)

    if (!thisPet) return

    if (props.adjective != currentPet.adjective) {
      newPetObject.adjective = props.adjective
      thisPet.adjective = props.adjective
    }
    if (props.description != currentPet.description) {
      newPetObject.description = props.description
      thisPet.description = props.description
    }

    if (Object.keys(newPetObject).length === 0) return

    await firestore().collection('pets').doc(currentPet.id).update({
      ...newPetObject
    })

    setPets(petsClone)
  }

  function updateVisualizedProfiles(petId: string) {
    setVisualizedProfiles(oldState => [...oldState, petId])
  }

  if (!recoveredPets || !recoveredVisualizedProfiles) {
    return <AppLoading />
  }

  return (
    <PetContext.Provider value={{
      pets,
      currentPet,
      registerPet,
      visualizedProfiles,
      userHasAPet,
      updatePet,
      updateVisualizedProfiles
    }}>
      { children }
    </PetContext.Provider>
  )
}

export function usePet() {
  const context = useContext(PetContext)
  return context
}