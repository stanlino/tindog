import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

export async function fetchPetDocuments(user_id: string) {
  const petDocumentsReference = firestore().collection('pets').where('user_id', '==', user_id)
  const petDocuments = await petDocumentsReference.get()

  const petDocumentNotEmpty = petDocuments.empty

  if (petDocumentNotEmpty) return

  return petDocuments
}

export async function fetchProfilesAlreadyViewed(pet_id: string) {
  const profilesAlreadyViewedReference = firestore().collection('pets').doc(pet_id).collection('visualized')
  const profilesAlreadyViewed = await profilesAlreadyViewedReference.get()

  const profilesAlreadyViewedEmpty = profilesAlreadyViewed.empty

  if (profilesAlreadyViewedEmpty) return

  return profilesAlreadyViewed
} 

interface CreatePetProps {
  name: string
  photo: string
  species: 'dog' | 'cat'
  sex: 'female' | 'male'
  description: string
}

export async function createPetDocument(user_id: string, pet_id: string, location: string, {
  name,
  photo,
  species,
  sex,
  description,
} : CreatePetProps) {

  const storageReference = storage().ref(`pets/${pet_id}`)
  await storageReference.putFile(photo)
  const photoDownloadURL = await storageReference.getDownloadURL()

  const petDocument = {
    user_id,
    name,
    photo: photoDownloadURL,
    species,
    sex,
    description,
    location
  }

  await firestore()
    .collection('pets')
    .doc(pet_id)
    .set(petDocument)

  return petDocument
}

export async function updatePetDocument(pet_id: string, description: string) {
  firestore()
    .collection('pets')
    .doc(pet_id)
    .update({
      description
    })
}