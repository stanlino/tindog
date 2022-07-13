import firestore from '@react-native-firebase/firestore'
import { Pet } from '../../../hooks/pet_document'

export function viewProfile(
  user_pet_id: string, 
  owner_pet_id: string, 
  type_of_interaction: string
) {  
  // firestore()
  //   .collection('pets')
  //   .doc(user_pet_id)
  //   .collection('visualized')
  //   .doc(owner_pet_id)
  //   .set({
  //   type_of_interaction
  // })
}

export async function likeProfile(
  myPet: Pet, 
  interestingPet: Pet, 
  userContact: string
) {
  
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


type Species = 'cat' | 'dog'
type Sex = 'male' | 'female'
type Location = {
  city: string
  state: string
}
type Scope = 'city' | 'state' | 'all'
type ExcludedProfiles = string[]


export async function fetchProfiles(
  species: Species, 
  sex: Sex, 
  location: Location, 
  scope: Scope, 
  excludedProfiles: ExcludedProfiles
) {

  const abstractQuery = firestore().collection('pets')
    .where('species', '==', species)
    .where('sex', '==', sex)
    .where(firestore.FieldPath.documentId(), 'not-in', excludedProfiles)

  const pets: Pet[] = []

  if (scope === 'city') {
    const query = await abstractQuery
      .where('city', '==', location.city)
      .where('state', '==', location.state)
      .get()
    query.docs.forEach(pet => {
      pets.push({ ...pet.data(), id: pet.id } as Pet)
    })

    return pets
  }

  if (scope === 'state') {
    const query = await abstractQuery.where('state', '==', location.state).get()
    query.docs.forEach(pet => {
      pets.push({ ...pet.data(), id: pet.id } as Pet)
    })

    return pets
  }

  if (scope === 'all') {
    const query = await abstractQuery.get()
    query.docs.forEach(pet => {
      pets.push({ ...pet.data(), id: pet.id } as Pet)
    })

    return pets
  }

  return []

}