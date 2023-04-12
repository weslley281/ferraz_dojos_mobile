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
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            aaaaaaaaaaa
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
