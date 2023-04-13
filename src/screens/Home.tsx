import { VStack, Center, ScrollView, HStack, Heading, Text } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { HomeHeader } from '@components/HomeHeader';

export function Home() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  return (
    <VStack flex={1}>
      <HomeHeader />

      <VStack px={8}>
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
