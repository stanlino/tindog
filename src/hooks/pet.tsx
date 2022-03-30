import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';

import { useAuth } from "./auth";
import { useFirestore } from "./firestore";
import { Alert } from "react-native";

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
  description: string
}

interface PetContextData {
  pets: Pet[]
  currentPet: Pet
  registerPet(pet: Pet): void,
  visualizedProfiles: string[]
  userHasAPet: boolean
}

const PetContext = createContext({} as PetContextData)

export function PetProvider({ children } : { children: ReactNode }) {

  const { user } = useAuth()
  const { userDoc } = useFirestore()

  const [recoveredPets, setRecoveredPets] = useState(false)
  const [recoveredVisualizedProfiles, setRecoveredVisualizedProfiles] = useState(false)

  const [pets, setPets] = useState<Pet[]>([{}] as Pet[])
  const [petIndex, setPetIndex] = useState(0)

  const currentPet = pets[petIndex]

  const userHasAPet = pets.length > 0

  const [visualizedProfiles, setVisualizedProfiles] = useState<string[]>([]) 

  useEffect(() => {
    firestore().collection('pets').where('userUID', '==', user?.uid).get()
      .then(docs => {
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
      })
      .finally(() => setRecoveredPets(true))
  },[])

  async function registerPet(props : Pet) {

    const storageReference = storage().ref(`pets/${user?.uid}-${props.name}-${new Date()}`)
    await storageReference.putFile(props.photo)
    const photoURl = await storageReference.getDownloadURL()

    firestore().collection('pets').doc().set({
      userUID: user?.uid,
      name: props.name,
      photo: photoURl,
      age: props.age,
      location: userDoc.userLocation,
      type: props.type,
      sex: props.sex,
      adjective: props.adjective,
      description: props.description
    }).then(() => {
      const petsClone = pets.map(pet => ({ ...pet }))
      petsClone.push(props)
      setPets(petsClone)
      setPetIndex(petsClone.length - 1)
    }).catch(error => {
      Alert.alert('Ops', error)
    })
  }

  if (!recoveredPets || !recoveredVisualizedProfiles) {
    return null
  }

  return (
    <PetContext.Provider value={{
      pets,
      currentPet,
      registerPet,
      visualizedProfiles,
      userHasAPet
    }}>
      { children }
    </PetContext.Provider>
  )
}

export function usePet() {
  const context = useContext(PetContext)
  return context
}