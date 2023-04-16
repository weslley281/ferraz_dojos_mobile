import { Input } from '@components/Input';
import { Center, Heading, ScrollView, VStack } from 'native-base';
import { useState } from 'react';

export function Graduations() {
  const [graduation, setGraduation] = useState('');
  const [description, setDescription] = useState('');

  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <VStack backgroundColor={'blueGray.700'} flex={1}>
      <Center px={5}>
        <Heading
          color="gray.100"
          fontSize="xl"
          mb={6}
          mt={6}
          fontFamily="heading"
        >
          Graduações
        </Heading>

        <Input
          placeholder="Nome"
          onChangeText={(text: string) => setGraduation(text)}
          value={graduation}
        />

        <Input
          placeholder="Description"
          onChangeText={(text: string) => setDescription(text)}
          value={description}
        />
      </Center>
    </VStack>
  </ScrollView>;
}
