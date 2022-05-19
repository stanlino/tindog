import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth'

export async function saveTokenToDatabase(user_uid: string, token: string) {
  await firestore()
    .collection('users')
    .doc(user_uid)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
    });
}

export async function removeTokenAndSignOut(user_uid: string) {
  const token = await messaging().getToken()
  await firestore()
    .collection('users')
    .doc(user_uid)
    .update({
      tokens: firestore.FieldValue.arrayRemove(token)
    })
  
  await auth().signOut()
}

interface UserProperties {
  user_name: string
  user_location: string
  user_cep: string
}

export async function createUserDocument(user_uid: string, {
  user_name,
  user_location,
  user_cep
}: UserProperties) {
  const userDocumentReference = firestore().collection('users').doc(user_uid)
  const response = await userDocumentReference.set({
    user_name,
    user_location,
    user_cep
  }, {
    merge: true
  })
  .then(() => true).catch(() => false)

  return response
}

export async function updateUserDocument(user_uid: string, {
  user_name,
  user_location,
  user_cep
} : UserProperties) {
  const userDocumentReference = firestore().collection('users').doc(user_uid)
  const response = await userDocumentReference.update({
    user_name,
    user_location,
    user_cep
  }).then(() => true).catch(() => false)

  return response
}