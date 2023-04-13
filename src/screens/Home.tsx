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
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { HomeHeader } from '@components/HomeHeader';
import { CustomButton } from '@components/ButtonIcon';
import { AppNavigatorRoutesProps } from '@routes/app.tab.routes';

export function Home() {
  const approutes = useNavigation<AppNavigatorRoutesProps>();

  return (
    <VStack flex={1}>
      <HomeHeader />

      <VStack px={8}>
        <Center>
          <Heading color={'gray.100'} mt={5} mb={5}>
            Alunos
          </Heading>
        </Center>
        <HStack space={2} alignItems="center">
          <CustomButton icon="adduser" onPress={() => {}} />
          <CustomButton icon="addusergroup" onPress={() => {}} />
          <CustomButton icon="Trophy" onPress={() => {}} />
          <CustomButton icon="md-school" onPress={() => {}} />
        </HStack>
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
