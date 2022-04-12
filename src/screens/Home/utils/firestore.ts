import firestore from '@react-native-firebase/firestore'
import { Pet } from '../../../hooks/pet'

export function viewProfile(myPetId: string, interestingPetId: string) {
  firestore().collection('pets').doc(myPetId).collection('visualized').add({
    petUID: interestingPetId
  })
}

export async function likeProfile(myPet: Pet, interestingPet: Pet) {
  
  const matchReference = await firestore()
    .collection('matchs')
    .where('pets', 'array-contains', [myPet.id!, interestingPet.id!])
    .get()

  const thisMatchDontExists = matchReference.empty

  if (thisMatchDontExists) {
    firestore().collection('matchs').add({
      pets: [myPet.id!, interestingPet.id!],
      owners: [myPet.userUID, interestingPet.userUID],
      itsAMatch: false
    })
    
  } else {
    matchReference.docs.forEach(doc => {
      doc.ref.update({
        itsAMatch: true
      })
    })
  }
}