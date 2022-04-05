import { Fragment, useCallback, useRef } from "react";
import { Feather } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from "react-native";
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

import SettingsModal, { SettingsModalProps } from '@screens/Settings';
import { Pet } from '../../../hooks/pet'

import { 
  Image, 
  ButtonsBackground,
  PickImageView
} from "./styles";

interface HeaderProps {
  image: string
  handleSetImage(photoUrl: string): void
  currentPet: Pet
}

async function updateImageInFirebase(newImage: string, petId: string) {
  const storageRef = storage().ref(`pets/${petId}`)
  await storageRef.delete()

  const newRef = storage().ref(`pets/${petId}`)
  await newRef.putFile(newImage)
  const photoURL = await newRef.getDownloadURL()

  await firestore().collection('pets').doc(petId).update({
    photo: photoURL
  })
}

export function Header({ image, handleSetImage, currentPet } : HeaderProps) {

  const SettingsRef = useRef({} as SettingsModalProps)

  function handleOpenSettingsModal() {
    SettingsRef.current.openSettingsModal()
  }

  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {

      if (currentPet?.id) {
        await updateImageInFirebase(result.uri, currentPet.id)
      }

      handleSetImage(result.uri);
    }
  }, [])

  return (
    <Fragment>

      <SettingsModal ref={SettingsRef} />

      {image ? (
          <Image source={{ uri: image }} />
        ) : (
          <PickImageView onPress={pickImage}>
            <Feather name="image" size={30} />
          </PickImageView>
      )}

      <ButtonsBackground>
        <TouchableOpacity onPress={handleOpenSettingsModal}>
          <Feather name="settings" size={30} color="black" />
        </TouchableOpacity>

        {image && (
          <TouchableOpacity style={{ marginTop: 10 }} onPress={pickImage}>
            <Feather name="image" size={30} color="black" />
          </TouchableOpacity>
        )}
      </ButtonsBackground>
      
    </Fragment>
  )
}
