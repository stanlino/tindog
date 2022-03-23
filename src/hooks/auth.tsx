import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '1034206141832-k1359qgktvahah4mbkoap0lgd8772k1r.apps.googleusercontent.com',
});

interface AuthContextData {
  initializing: boolean
  user: FirebaseAuthTypes.User | null
  signInWithGoogle(): void;
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
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth().signInWithCredential(googleCredential);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  },[])
  
  return (
    <AuthContext.Provider value={{
      initializing,
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