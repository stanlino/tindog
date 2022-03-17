import { StackScreenProps } from "@react-navigation/stack"
import { Profile } from "./profile"

export type AuthRoutesParams = {
  index: undefined
  phone: undefined
}

export type SignInScreenProps = StackScreenProps<AuthRoutesParams, 'index'>
export type PhoneSignInScreenProps = StackScreenProps<AuthRoutesParams, 'phone'>

export type AppRoutesParams = {
  profile: Profile
  matches_stack: undefined
  home_stack: undefined
}

export type ProfileScreenProps = StackScreenProps<AppRoutesParams, 'profile'>

export type AppHomeStackParams = {
  index: undefined
  profile: Profile
}

export type HomeStackScreenProps = StackScreenProps<AppHomeStackParams, 'index'>

export type AppMatchesStackProps = {
  index: undefined
  profile: Profile
}

export type MatchesStackScreenProps = StackScreenProps<AppMatchesStackProps, 'index'>