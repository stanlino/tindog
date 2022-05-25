import { Pet } from '@hooks/pet_document'
import firestore from '@react-native-firebase/firestore'

type Match = {
  id: string
  pets: string[]
  itsAMatch: boolean
  contacts: string[]
}

export async function getSuitorDocuments(suitors_id: string[]): Promise<Pet[]> {

  if (suitors_id.length < 1) return []

  const suitorsDocumentsReference = await firestore()
    .collection('pets')
    .where(firestore.FieldPath.documentId(), 'in', suitors_id)
    .get()

  return suitorsDocumentsReference.docs.map(doc => ({ ...doc.data(), id: doc.id } as Pet))
}

export async function getMatchDocuments(pet_id: string): Promise<Match[]> {

  const matchDocumentsReference = await firestore()
    .collection('matchs')
    .where('pets', 'array-contains', pet_id)
    .where('itsAMatch', '==', true)
    .get()

  return matchDocumentsReference.docs.map(doc => ({ ...doc.data(), id: doc.id } as Match))
}