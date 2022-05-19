import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';

import { useAuth } from "./auth";

import { 
  createUserDocument,
  saveTokenToDatabase,
  updateUserDocument as updateUserDoc
} from "./utils/user_firestore_functions";

interface UserProperties {
  user_name: string
  user_location: string
  user_cep: string
}

interface UserDocumentContextData {
  userDocument: UserProperties
  updateUserDocument({
    user_name,
    user_location,
    user_cep
  }: UserProperties) : void 
}

const UserDocumentContext = createContext({} as UserDocumentContextData)

export function UserDocumentProvider({ children }: { children: ReactNode }) {

  const { user } = useAuth()

  const [userDocument, setUserDocument] = useState({} as UserProperties)
  const [initializing, setInitializing] = useState(true)

  const userDocumentReference = firestore().collection('users').doc(user.uid)

  function updateUserDocument({
    user_name,
    user_location,
    user_cep
  }: UserProperties) {
    userDocument.user_name ?
      updateUserDoc(user.uid, {
        user_cep,
        user_location,
        user_name
      })
    : createUserDocument(user.uid, {
      user_cep,
      user_location,
      user_name
    })

    setUserDocument({
      user_name,
      user_location,
      user_cep
    })

  }

  useEffect(() => {

    userDocumentReference.get()
      .then(doc => {
        if (doc.exists) {
          setUserDocument(doc.data() as UserProperties)
        }
      })
      .finally(() => {
        setInitializing(false)
      })
    
  },[])

  useEffect(() => {

    if (userDocument.user_name) {
      messaging().getToken().then(token => {
        return saveTokenToDatabase(user.uid, token)
      })
    }

  }, [userDocument])

  if (initializing) {
    return null
  }

  return (
    <UserDocumentContext.Provider value={{
      userDocument,
      updateUserDocument,
    }}>
      {children}
    </UserDocumentContext.Provider>
  )
}

export function useUserDocument() {
  const context = useContext(UserDocumentContext)
  return context
} 