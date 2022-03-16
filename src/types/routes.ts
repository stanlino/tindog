import { StackScreenProps } from "@react-navigation/stack"

export type AuthRoutesParams = {
  index: undefined
  phone: undefined
}

export type SignInScreenProps = StackScreenProps<AuthRoutesParams, 'index'>
export type PhoneSignInScreenProps = StackScreenProps<AuthRoutesParams, 'phone'>

export type AppRoutesParams = {
  profile: undefined
  matches: undefined
}

export type ProfileScreenProps = StackScreenProps<AppRoutesParams, 'profile'>
export type MatchesScreenProps = StackScreenProps<AppRoutesParams, 'matches'>
