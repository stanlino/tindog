import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AppLoading from 'expo-app-loading';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '1034206141832-k1359qgktvahah4mbkoap0lgd8772k1r.apps.googleusercontent.com',
});

interface AuthContextData {
  user: FirebaseAuthTypes.User | null
  signInWithGoogle(): Promise<boolean>;
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children } : { children: ReactNode }) {
  
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user)

    if (initializing) {
      setInitializing(false)
    }
  }
  
  async function signInWithGoogle() {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      return true
    } catch {
      return false
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  },[])
  
  if (initializing) {
    return <AppLoading />
  }

  return (
    <AuthContext.Provider value={{
      signInWithGoogle,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}