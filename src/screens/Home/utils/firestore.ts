import firestore from '@react-native-firebase/firestore'
import { Pet } from '../../../hooks/pet'

export function viewProfile(myPetId: string, interestingPetId: string) {
  firestore().collection('pets').doc(myPetId).collection('visualized').add({
    petUID: interestingPetId
  })
}

export async function likeProfile(myPet: Pet, interestingPet: Pet, userContact: string) {
  
  await fetch('https://tindog-messaging-api.herokuapp.com/')

  const matchReference = await firestore()
    .collection('matchs')
    .where('pets', 'array-contains-any', [myPet.id!, interestingPet.id!])
    .get()

  const thisMatchAlreadyExists = !matchReference.empty

  if (thisMatchAlreadyExists) {
    matchReference.docs.forEach(doc => {
      doc.ref.update({
        itsAMatch: true,
        contacts: firestore.FieldValue.arrayUnion(userContact)
      })
    })
  } else {
    firestore().collection('matchs').add({
      pets: [myPet.id!, interestingPet.id!],
      owners: [myPet.userUID, interestingPet.userUID],
      contacts: [userContact],
      itsAMatch: false
    })
  }
}