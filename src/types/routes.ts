import { StackScreenProps } from "@react-navigation/stack"
import { Pet } from "../hooks/pet"

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
}

export type RandomRrofileRoutesParams = {
  index: undefined
  randomProfile: {
    pet: Pet
  }
}

export type IndexScreenProps = StackScreenProps<RandomRrofileRoutesParams, 'index'>
export type RandomProfileScreenProps = StackScreenProps<RandomRrofileRoutesParams, 'randomProfile'>