import { Fragment, useCallback, useRef } from "react";
import { Feather } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from "react-native";
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

import SettingsModal, { SettingsModalProps } from '@screens/Settings';
import { Pet } from '../../../hooks/pet_document'

import { 
  Image, 
  ButtonsBackground,
  PickImageView,
  WavesSvg,
  BackButton
} from "./styles";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  image: string
  handleSetImage(photoUrl: string): void
  currentPet: Pet,
  updatePetPhotoInState(photo_url: string): void
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

export function Header({ image, handleSetImage, currentPet, updatePetPhotoInState } : HeaderProps) {

  const SettingsRef = useRef({} as SettingsModalProps)

  const { navigate } = useNavigation()

  function handleOpenSettingsModal() {
    SettingsRef.current.openSettingsModal()
  }

  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [41, 57],
      quality: 1,
    })

    if (!result.cancelled) {

      handleSetImage(result.uri)

      if (currentPet?.id) {
        updatePetPhotoInState(result.uri)
        await updateImageInFirebase(result.uri, currentPet.id)
      }
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

      <WavesSvg style={{ transform: [{ rotate: '180deg' }] }} />

      <ButtonsBackground>
        <TouchableOpacity onPress={handleOpenSettingsModal}>
          <Feather name="settings" size={30} color="white" />
        </TouchableOpacity>

        {image && (
          <TouchableOpacity style={{ marginTop: 20 }} onPress={pickImage}>
            <Feather name="image" size={30} color="white" />
          </TouchableOpacity>
        )}
      </ButtonsBackground>

      {currentPet?.id && (
        <BackButton onPress={() => navigate('home')}>
          <Feather name="arrow-right" size={30} color="white" />
        </BackButton>
      )}
      
    </Fragment>
  )
}

