import { Pet } from '@hooks/pet_document'
import firestore from '@react-native-firebase/firestore'

type VisualizedProfiles= {
  type_of_interaction: 'reject' | 'like'
  pet_id: string
}

type Match = {
  id: string
  pets: string[]
  itsAMatch: boolean
  contacts: string[]
  suitor: Pet
}

export async function getVisualizedProfiles(
  visualizedProfiles: VisualizedProfiles[],
  matchs: Match[],
  pet_id: string
) {
  const visualizedProfilesIds = visualizedProfiles.map(profile => (profile.pet_id))
  const profilesInMatch: string[] = []
  
  matchs.forEach(match => {
    if (match.itsAMatch) {
      match.pets.forEach(petId => {
        if (petId !== pet_id) {
          profilesInMatch.push(petId)
        }
      })
    }
  }) 

  const profilesAvailables = visualizedProfilesIds.filter(item => !profilesInMatch.includes(item))

  const petsReference = await firestore()
    .collection('pets')
    .where(firestore.FieldPath.documentId(), 'in', profilesAvailables)
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

export function viewProfile(
  user_pet_id: string, 
  owner_pet_id: string, 
  type_of_interaction: string
) {  
  firestore()
    .collection('pets')
    .doc(user_pet_id)
    .collection('visualized')
    .doc(owner_pet_id)
    .set({
    type_of_interaction
  })
}

export async function likeProfile(
  myPet: Pet, 
  interestingPet: Pet, 
  userContact: string
) {

  viewProfile(myPet.id, interestingPet.id, 'like')
  
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
      owners: [myPet.user_id, interestingPet.user_id],
      contacts: [userContact],
      itsAMatch: false
    })
  }
}

export async function unlikeProfile(
  myPet: Pet, 
  interestingPet: Pet
) {
  viewProfile(myPet.id, interestingPet.id, 'reject')

  const ref = await firestore()
    .collection('matchs')
    .where('pets', 'array-contains', [myPet.id, interestingPet.id])
    .where('itsAMatch', '==', true)
    .get()

  ref.docs.forEach(doc => {
    doc.ref.update({
      itsAMatch: false
    })
  })
}