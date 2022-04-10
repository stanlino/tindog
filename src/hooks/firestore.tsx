import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore'
import AppLoading from 'expo-app-loading';

import { useAuth } from "./auth";

interface DocumentData {
  userName: string
  userLocation: string
  userCEP: string
}

interface FirestoreContextData {
  userDoc: DocumentData
  createUserDoc(userName: string, userLocation: string, userCEP: string): void
  updateUserDoc(userName: string, userLocation: string, userCEP: string): void
}

const FirestoreContext = createContext({} as FirestoreContextData)

export function FirestoreProvider({ children }: { children: ReactNode }) {
  
  const { user } = useAuth()

  const [userDoc, setUserDoc] = useState({} as DocumentData)
  const [initializing, setInitializing] = useState(true)

  const usersCollection = firestore().collection('users')
  
  function createUserDoc(userName: string, userLocation: string, userCEP: string) {
    usersCollection.doc(user?.uid).set({
      userName,
      userLocation,
      userCEP
    }).then(() => {
      setUserDoc({ userName, userLocation, userCEP })
    })
  }
 
  function updateUserDoc(userName: string, userLocation: string, userCEP: string) {
    usersCollection.doc(user?.uid).update({
      userName,
      userLocation,
      userCEP
    }).then(() => {
      setUserDoc({ userName, userLocation, userCEP })
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

  if (initializing) {
    return <AppLoading />
  }

  return (
    <FirestoreContext.Provider value={{
      userDoc,
      createUserDoc,
      updateUserDoc,
    }}>
      {children}
    </FirestoreContext.Provider>
  )
}

export function useFirestore() {
  const context = useContext(FirestoreContext)
  return context
} 