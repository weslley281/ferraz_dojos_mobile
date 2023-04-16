import {
  VStack,
  Center,
  ScrollView,
  HStack,
  Heading,
  Text,
  View,
} from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { HomeHeader } from '@components/HomeHeader';
import { CustomButtonAntDesign } from '@components/ButtonIconAntDesign';
import { CustomButtonIonicons } from '@components/ButtonIconIonicons';

export function Dashboard() {
  const { navigate } = useNavigation<any>();

  return (
    <VStack flex={1}>
      <HomeHeader />

      <VStack px={8}>
        <HStack space={2} alignItems="center">
          <CustomButtonAntDesign icon="adduser" onPress={() => {}} />
          <CustomButtonAntDesign icon="addusergroup" onPress={() => {}} />
          <CustomButtonIonicons icon="school" onPress={() => {}} />
          <CustomButtonAntDesign icon="Trophy" onPress={() => {}} />
        </HStack>
        <Center>
          <Heading color={'gray.100'} mt={5} mb={5}>
            Alunos
          </Heading>
        </Center>

        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Fulano
          </Heading>

          <Text color="gray.200" fontSize="sm">
            ativo
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
