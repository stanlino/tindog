import { Pet } from '@hooks/pet_document'
import firestore from '@react-native-firebase/firestore'

type VisualizedProfiles= {
  type_of_interaction: 'reject' | 'like'
  pet_id: string
}

export async function getVisualizedProfiles(visualizedProfiles: VisualizedProfiles[]) {
  const visualizedProfilesIds = visualizedProfiles.map(profile => (profile.pet_id))

  const petsReference = await firestore()
    .collection('pets')
    .where(firestore.FieldPath.documentId(), 'in', visualizedProfilesIds)
    .get()
  
  const profiles: Pet[] = []

  petsReference.docs.forEach(doc => {
    profiles.push({
      ...doc.data(),
      id: doc.id
    } as Pet)
  })

  return profiles
}