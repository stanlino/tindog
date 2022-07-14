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
  presentation: {
    pet: Pet
    itsAMatch: boolean
    contact?: string
  }
  settings: undefined
  localization: undefined
  feedback: undefined
  history: undefined
  create_profile: undefined
}

export type HomeScreenProps = StackScreenProps<AppRoutesParams, 'home'>
export type PresentationProps = StackScreenProps<AppRoutesParams, 'presentation'>
export type MatchesScreenProps = StackScreenProps<AppRoutesParams, 'matches'>
export type ProfileScreenProps = StackScreenProps<AppRoutesParams, 'profile'>
export type SettingsScreenProps = StackScreenProps<AppRoutesParams, 'settings'>
export type LocalizationScreenProps = StackScreenProps<AppRoutesParams, 'localization'>
export type FeedbackScreenProps = StackScreenProps<AppRoutesParams, 'feedback'>
export type HistoryScreenProps = StackScreenProps<AppRoutesParams, 'history'>
export type CreateProfileScreenProps = StackScreenProps<AppRoutesParams, 'create_profile'>