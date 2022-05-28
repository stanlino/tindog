import { CreatePetProvider } from './hooks/create_pet'
import { CreateProfile } from './create_profile'

export function CreatePet() {
  return (
    <CreatePetProvider>
      <CreateProfile />
    </CreatePetProvider>
  )
}