import { TouchableOpacity } from 'react-native';
import { Heading, HStack, Text, VStack, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { loadDojoStorageData } from '@utils/dojo';
import { api } from '@services/api';
import { useAuth } from '@hooks/auth';

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
  const { signOut, user } = useAuth();

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Dojo,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.dojo}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="red.700" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
