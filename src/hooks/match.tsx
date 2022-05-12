import { 
  createContext, 
  ReactNode, 
  useContext, 
  useEffect, 
  useState 
} from "react";

import { usePet } from "./pet_document";
import { getMatchDocuments } from "./utils/match_firestore_functions";

type Match = {
  id: string
  pets: string[]
  itsAMatch: boolean
  contacts: string[]
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

    const matchDocuments = await getMatchDocuments(currentPet.id!)
    
    setMatchs(matchDocuments as unknown as Match[])
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