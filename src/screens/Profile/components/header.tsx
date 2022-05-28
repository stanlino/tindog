import { Fragment, useCallback, useRef } from "react";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Pet, usePet } from '../../../hooks/pet_document'
import { AppRoutesParams } from "src/types/routes";

import { 
  Image, 
  Head,
  WavesSvg,
  Button
} from "./styles";

interface HeaderProps {
  image: string
  handleSetImage(photoUrl: string): void
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

export function Header({ image, handleSetImage } : HeaderProps) {

  const { goBack } = useNavigation<StackNavigationProp<AppRoutesParams, 'profile'>>()

  const { currentPet, updatePetPhotoInState  } = usePet()

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

      <Image style={{ aspectRatio: 41/57 }} source={{ uri: image }} />

      <WavesSvg style={{ transform: [{ rotate: '180deg' }] }} />

      <Head>
        <Button onPress={pickImage}>
          <MaterialCommunityIcons name="image-edit" size={30} color="white" />
        </Button>
        <Button onPress={() => goBack()}>
          <Feather name="arrow-right" size={30} color="white" />
        </Button>
      </Head>
      
    </Fragment>
  )
}

