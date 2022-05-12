import { StackScreenProps } from "@react-navigation/stack"
import { Pet } from "../hooks/pet_document"

export type AuthRoutesParams = {
  index: undefined
  welcome: undefined
}

export type SignInScreenProps = StackScreenProps<AuthRoutesParams, 'index'>
export type WelcomeScreenProps = StackScreenProps<AuthRoutesParams, 'welcome'>

export type AppRoutesParams = {
  profile: undefined
  matches: any
  home: any
  randomProfile: {
    pet: Pet
  }
}

export type HomeScreenProps = StackScreenProps<AppRoutesParams, 'home'>
export type RandomProfileScreenProps = StackScreenProps<AppRoutesParams, 'randomProfile'>
export type MatchesScreenProps = StackScreenProps<AppRoutesParams, 'matches'>
export type ProfileScreenProps = StackScreenProps<AppRoutesParams, 'profile'>