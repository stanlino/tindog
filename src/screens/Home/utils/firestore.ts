import firestore from '@react-native-firebase/firestore'
import { Pet } from '../../../hooks/pet'

export function handleViewProfile(myPetId: string, interestingPetId: string) {
  firestore().collection('pets').doc(myPetId).collection('visualized').add({
    petUID: interestingPetId
  })
}

export async function handleLikeProfile(myPet: Pet, interestingPet: Pet) {
  
  handleViewProfile(myPet.id!, interestingPet.id!)

  const thisMatchDontExists = (
    await firestore()
      .collection('matchs')
      .where('interestingID', '==', myPet.id!)
      .where('interestedID', '==', interestingPet.id!)
      .get()
  ).empty

  if (thisMatchDontExists) {

    firestore().collection('matchs').add({
      interestingID: interestingPet.id,
      interestingName: interestingPet.name,
      interestingPhoto: interestingPet.photo,
      interestedID: myPet.id,
      interestedName: myPet.name,
      interestedPhoto: myPet.photo,
      itsAMatch: false
    })

  } else {

    firestore()
    .collection('matchs')
    .where('interestingID', '==', myPet.id!)
    .where('interestedID', '==', interestingPet.id!)
    .get()
    .then(docs => {
      docs.forEach(doc => {
        doc.ref.update({
          itsAMatch: true
        })
      })
    })

  }
  
}

export function handleRejectProfile(myPetId: string, interestingPetId: string) {
  handleViewProfile(myPetId, interestingPetId)
}