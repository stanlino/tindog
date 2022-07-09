import { createContext, ReactNode, useEffect, useState } from "react";
import * as Updates from "expo-updates";
import { UpdatesModal } from "@components/UpdatesModal";
 
type UpdateStep = 'DOWNLOADING' | 'FINISH'

const UpdatesContext = createContext({})

export function UpdatesProvider({ children } : { children: ReactNode }) {

  const [ hasUpdates, setHasUpdates ] = useState(false)
  const [ updateStep, setUpdateStep ] = useState<UpdateStep>('DOWNLOADING')

  // useEffect(() => {
  //   async function updateApp() {
  //     const { isAvailable } = await Updates.checkForUpdateAsync()
  //     if (!isAvailable) return

  //     setHasUpdates(true)
  //     await Updates.fetchUpdateAsync()

  //     setUpdateStep('FINISH')

  //     setTimeout(async () => {
  //       await Updates.reloadAsync()
  //     }, 1500)
  //   }

  //   updateApp()
  // },[])

  return (
    <UpdatesContext.Provider value={{}}>

      <UpdatesModal visible={hasUpdates} step={updateStep} />

      {children}
    </UpdatesContext.Provider>
  )
}