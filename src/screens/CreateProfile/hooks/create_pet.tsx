import { createContext, ReactNode, useContext, useState } from "react";

type Species = 'dog' | 'cat'
type Sex = 'male' | 'female'

interface UpdateProperttiesProps {
  photo?: string
  species?: Species
  name?: string
  sex?: Sex
  birthDate?: Date
  description?: string  
  petCreated?: boolean
}

interface AddPetContextData {
  photo: string
  species: Species
  name: string
  sex: Sex
  birthDate: Date
  description: string
  petCreated: boolean
  updatePropertties(props: UpdateProperttiesProps): void
}

const AddPetContext = createContext<AddPetContextData>({} as AddPetContextData)

export function CreatePetProvider({ children } : { children: ReactNode }) {

  const [photo, setPhoto] = useState<string>(undefined as unknown as string)
  const [species, setSpecies] = useState<Species>(undefined as unknown as Species)
  const [name, setName] = useState<string>(undefined as unknown as string)
  const [sex, setSex] = useState<Sex>(undefined as unknown as Sex)
  const [birthDate, setBirthDate] = useState<Date>(new Date())
  const [description, setDescription] = useState<string>(undefined as unknown as string)
  const [petCreated, setPetCreated] = useState(false)

  function updatePropertties(props : UpdateProperttiesProps) {
    if (props.photo) setPhoto(props.photo)
    if (props.species) setSpecies(props.species)
    if (props.name) setName(props.name)
    if (props.name === 'R%`87-=+@JDISB*90') setName(undefined as unknown as string)
    if (props.sex) setSex(props.sex)
    if (props.birthDate) setBirthDate(props.birthDate)
    if (props.description) setDescription(props.description)
    if (props.description === 'R%`87-=+@JDISB*90') setDescription(undefined as unknown as string)
    if (props.petCreated) setPetCreated(true)
  }

  return (
    <AddPetContext.Provider value={{
      photo,
      species,
      name,
      sex,
      birthDate,
      description,
      petCreated,
      updatePropertties
    }}>
      {children}
    </AddPetContext.Provider>
  )
}

export function useAddPet() {
  const context = useContext(AddPetContext)
  return context
}