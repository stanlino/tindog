import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore'

import { useAuth } from "./auth";

interface DocumentData {
  userName: string
  userLocation: string
  userPet: number[]
}

interface FirestoreContextData {
  userDoc: DocumentData
  createUserDoc(userName: string, userLocation: string): void
  updateUserDoc(userName: string, userLocation: string): void
  initializing: boolean
}

const FirestoreContext = createContext({} as FirestoreContextData)

export function FirestoreProvider({ children }: { children: ReactNode }) {
  
  const { user } = useAuth()

  const [userDoc, setUserDoc] = useState({} as DocumentData)
  const [initializing, setInitializing] = useState(true)

  const usersCollection = firestore().collection('users')
  
  function createUserDoc(userName: string, userLocation: string) {
    usersCollection.doc(user?.uid).set({
      userName,
      userLocation,
    }).then(() => {
      setUserDoc({ userName, userLocation, userPet: [] })
    })
  }
 
  function updateUserDoc(userName: string, userLocation: string) {
    usersCollection.doc(user?.uid).update({
      userName,
      userLocation
    }).then(() => {
      setUserDoc(oldState => ({ userName, userLocation, userPet: oldState.userPet }))
    }) 
  }

  useEffect(() => {
    usersCollection.doc(user?.uid).get()
    .then(doc => {
      if (doc.exists) {
        setUserDoc(doc.data() as DocumentData)
      }
    })
    .finally(() => {
      setInitializing(false)
    })
  },[])

  return (
    <FirestoreContext.Provider value={{
      userDoc,
      createUserDoc,
      updateUserDoc,
      initializing
    }}>
      {children}
    </FirestoreContext.Provider>
  )
}

export function useFirestore() {
  const context = useContext(FirestoreContext)
  return context
} 