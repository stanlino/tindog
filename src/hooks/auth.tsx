import { 
  createContext, 
  ReactNode, 
  useCallback, 
  useContext, 
  useEffect, 
  useState 
} from "react";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import AppLoading from 'expo-app-loading';

import { removeTokenAndSignOut } from "./utils/user_firestore_functions";

GoogleSignin.configure({
  webClientId: '1034206141832-k1359qgktvahah4mbkoap0lgd8772k1r.apps.googleusercontent.com',
});

type signInWithGoogleReponse = 'SUCCESS' | 'PLAY_SERVICES_NOT_AVAILABLE' | 'UNKNOWN'

interface AuthContextData {
  user: FirebaseAuthTypes.User
  signInWithGoogle(): Promise<signInWithGoogleReponse>
  signOut(): void
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children } : { children: ReactNode }) {
    
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User>({} as FirebaseAuthTypes.User)

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {

    if (user) {
      setUser(user)
    } else {
      setUser({} as FirebaseAuthTypes.User)
    }

    if (initializing) {
      setInitializing(false)
    }
  }

  function signOut() {
    removeTokenAndSignOut(user.uid)
  }

  const signInWithGoogle = useCallback(async() => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      return 'SUCCESS'
    } catch (error: any) {
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return 'PLAY_SERVICES_NOT_AVAILABLE'
      }
      return 'UNKNOWN'
    }
  },[])

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
      signOut,
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