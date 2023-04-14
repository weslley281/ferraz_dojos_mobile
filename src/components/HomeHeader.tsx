import { TouchableOpacity } from 'react-native';
import { Heading, HStack, Text, VStack, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { loadDojoStorageData } from '@utils/dojo';
import { api } from '@services/api';

interface IDojo {
  id_dojo: string;
  dojo: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  paid_out: string;
  createdAt: Date;
  updatedAt: Date;
}

export function HomeHeader() {
  const { navigate } = useNavigation<any>();

  const token = loadDojoStorageData();
  const [data, setData] = useState<IDojo>({
    id_dojo: 'Nada aqui',
    dojo: 'Nada aqui',
    phone: 'Nada aqui',
    email: 'Nada aqui',
    address_line1: 'Nada aqui',
    address_line2: 'Nada aqui',
    city: 'Nada aqui',
    state: 'Nada aqui',
    country: 'Nada aqui',
    paid_out: 'Nada aqui',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  async function getDataById() {
    const idDojoStoraged = await AsyncStorage.getItem('@id_dojo');

    try {
      const response = await api.get(`dojos/id/${idDojoStoraged}`);

      const dataDojo = {
        id_dojo: response.data.id_dojo,
        dojo: response.data.dojo,
        phone: response.data.phone,
        email: response.data.email,
        address_line1: response.data.address_line1,
        address_line2: response.data.address_line2,
        city: response.data.city,
        state: response.data.state,
        country: response.data.country,
        paid_out: response.data.paid_out,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
      };

      setData(dataDojo);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataById();
    console.log(data);
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
          {data.dojo ? data.dojo : ''}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={logout}>
        <Icon as={MaterialIcons} name="logout" color="red.700" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
