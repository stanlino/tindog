import { 
  createContext, 
  ReactNode, 
  useContext, 
  useEffect, 
  useState 
} from "react";

import { Pet, usePet } from "./pet_document";
import { getMatchDocuments, getSuitorDocuments } from "./utils/match_firestore_functions";

type Match = {
  id: string
  pets: string[]
  itsAMatch: boolean
  contacts: string[]
  suitor: Pet
}

interface MatchContextData {
  matchs: Match[]
  fetchMatchDocuments(): void
}

const MatchContext = createContext({} as MatchContextData)

export function MatchProvider({ children } : { children: ReactNode }) {

  const { currentPet } = usePet()

  const [matchs, setMatchs] = useState([] as Match[])
  const [loading, setLoading] = useState(true)

  async function fetchMatchDocuments() {

    if (!currentPet?.id) return setLoading(false)

    const matchDocuments = await getMatchDocuments(currentPet.id)

    const suitorsIds = matchDocuments.map(match => {
      return match.pets.find(id => id !== currentPet.id)
    })

    const suitorDocuments = await getSuitorDocuments(suitorsIds as string[])

    setMatchs(
      matchDocuments.map(match => {

      const suitorId = match.pets.find(pet => pet !== currentPet.id)

        return {
          ...match,
          suitor: suitorDocuments.find(pet => pet.id === suitorId)!
        }
      })
    )
    setLoading(false)
  }

  useEffect(() => { 
    fetchMatchDocuments()
  }, [])

  if (loading) return null

  return (
    <MatchContext.Provider value={{ matchs, fetchMatchDocuments }}> 
      {children}
    </MatchContext.Provider>
  )
}

export function useMatch() {
  const context = useContext(MatchContext)
  return context
}