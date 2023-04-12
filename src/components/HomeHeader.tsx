import { TouchableOpacity } from 'react-native';
import { Heading, HStack, Text, VStack, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { Loading } from '@components/Loading';

import { UserPhoto } from './UserPhoto';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { verify } from 'jsonwebtoken';

interface tokenDojo {
  token: string;
  dojo: {
    id_dojo: string;
    dojo: string;
    email: string;
  };
}

export function HomeHeader() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const [storageLoading, setStorageLoading] = useState(true);
  const [dojo, setDojo] = useState<tokenDojo>({} as tokenDojo);

  useEffect(() => {
    async function loadDojoStorageData() {
      const dojoStoraged = await AsyncStorage.getItem('@tokenFerraz');

      if (dojoStoraged) {
        const dojoLogged = JSON.parse(dojoStoraged) as tokenDojo;
        setDojo(dojoLogged);

        verify(dojoLogged.dojo, '@tokenFerraz', (err: any, decoded: any) => {
          console.log(`O ID do usuário é: ${decoded.subject}`);
          // O ID do usuário pode estar incluído no payload do token
          return decoded.subject;
        });
      }
      setStorageLoading(false);
    }

    console.log('O dojo é: ' + dojo);
    loadDojoStorageData();
  }, []);

  async function logout() {
    await AsyncStorage.removeItem('@tokenFerraz');
    return navigate('signIn');
  }

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Dojo,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {storageLoading ? '' : 'Quebra Dentes Dentes Dojo de Artes Marciais'}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={logout}>
        <Icon as={MaterialIcons} name="logout" color="red.700" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
