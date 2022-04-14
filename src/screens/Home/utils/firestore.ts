import firestore from '@react-native-firebase/firestore'
import { Pet } from '../../../hooks/pet'

export function viewProfile(myPetId: string, interestingPetId: string) {
  firestore().collection('pets').doc(myPetId).collection('visualized').add({
    petUID: interestingPetId
  })
}

export async function likeProfile(myPet: Pet, interestingPet: Pet, userContact: string) {
  const documentId = `${myPet.id!}${interestingPet.id!}`
  const alternativeDocumentId = `${interestingPet.id}${myPet.id}`

  const matchReference = await firestore()
    .collection('matchs')
    .doc(alternativeDocumentId)
    .get()

  const thisMatchAlreadyExists = matchReference.exists

  if (thisMatchAlreadyExists) {
    matchReference.ref.update({
      itsAMatch: true,
      contacts: firestore.FieldValue.arrayUnion(userContact)
    }).then(() => {
      fetch(`https://tindog-messaging-api.herokuapp.com/${matchReference.id}`)
    })
  } else {
    await firestore().collection('matchs').doc(documentId).set({
      pets: [myPet.id!, interestingPet.id!],
      owners: [myPet.userUID, interestingPet.userUID],
      contacts: [userContact],
      itsAMatch: false
    })
  }
}