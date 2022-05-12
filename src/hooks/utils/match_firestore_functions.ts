import firestore from '@react-native-firebase/firestore'

export async function getMatchDocuments(pet_id: string) {

  const matchDocumentsReference = await firestore()
    .collection('matchs')
    .where('pets', 'array-contains', pet_id)
    .where('itsAMatch', '==', true)
    .get()

  return matchDocumentsReference.docs.map(doc => {
    ({ ...doc.data(), id: doc.id })
  })

}