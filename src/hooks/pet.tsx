import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';

import { useAuth } from "./auth";
import { useFirestore } from "./firestore";
import { Alert } from "react-native";

interface Pet {
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
  currentPet: number
  registerPet(pet: Pet): void
}

const PetContext = createContext({} as PetContextData)

export function PetProvider({ children } : { children: ReactNode }) {

  const { user } = useAuth()
  const { userDoc } = useFirestore()

  const [pets, setPets] = useState<Pet[]>([{}] as Pet[])
  const [currentPet, setCurrentPet] = useState(0)

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
          petDocs.push({...doc.data(), id: doc.id} as Pet)
        })
        setPets(petDocs)
      })
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
      setCurrentPet(petsClone.length - 1)
    }).catch(error => {
      Alert.alert('Ops', error)
    })
  }

  return (
    <PetContext.Provider value={{
      pets,
      currentPet,
      registerPet
    }}>
      { children }
    </PetContext.Provider>
  )
}

export function usePet() {
  const context = useContext(PetContext)
  return context
}