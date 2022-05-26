import React from 'react'

import { Alert, FlatList, Linking, Share, StatusBar } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; 

import { useAuth } from '../../hooks/auth';
import { useUserDocument } from '@hooks/user_document';

import { SettingsScreenProps } from 'src/types/routes';

import { SmallButton } from '@components/SmallButton';

import { 
  Row,
  Container,
  Profile,
  ProfileImage,
  ProfileBlock,
  ProfileName,
  ProfileLocation,
  ListItem,
  ItemTitle,
  Separator
} from './styles'

type Option = {
  name: string
  icon: keyof typeof MaterialIcons.glyphMap
  action: () => void
}

export function Settings({ navigation } : SettingsScreenProps) {

  const { signOut, user } = useAuth()
  const { userDocument } = useUserDocument()

  function handleSignOut() {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair da conta?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', style: 'destructive', onPress: signOut }
    ], { cancelable: true })
  }

  async function handleShare() {
    await Share.share({
      message: 'https://play.google.com/store/apps/details?id=com.tindog\nOi, já conhece o Tindog? Encontre o parceiro certo para seu pet!',
    });
  };

  async function handleClickPrivacyTip() {
    Linking.openURL('https://www.notion.so/Pol-tica-de-privacidade-do-tindog-f2c3d48106d041eda8cee5a34468cef4')
  };

  const options: Option[] = [
    // { name: 'Tema', icon: 'brightness-medium', action: () => {} },
    { name: 'Minha privacidade', icon: 'privacy-tip', action: handleClickPrivacyTip },
    { name: 'Feedback', icon: 'feedback', action: () => navigation.navigate('feedback') },
    { name: 'Compartilhe o tindog', icon: 'share', action: handleShare },
    { name: 'Sair', icon: 'exit-to-app', action: handleSignOut },
  ]
  
  return (
    <Container>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={'#0000'}/>
      <Row>
        <Profile>
          <ProfileImage source={{ uri: user.photoURL! }} />
          <ProfileBlock>
            <ProfileName>{user.displayName}</ProfileName>
            <ProfileLocation>{userDocument.user_location}</ProfileLocation>
          </ProfileBlock>
        </Profile>
        <SmallButton color='#dbe9f4' onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color="#000" />
        </SmallButton>
      </Row>
      <FlatList 
        data={options}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <ListItem onPress={item.action}>
            <MaterialIcons name={item.icon} size={24} color="black" />
            <ItemTitle>{item.name}</ItemTitle>
          </ListItem>
        )}
      />
    </Container>
  )
}
