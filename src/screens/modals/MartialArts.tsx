import { Input } from '@components/Input';
import { useAuth } from '@hooks/auth';
import { api } from '@services/api';
import { Center, Heading, ScrollView, VStack } from 'native-base';
import { useState } from 'react';
import { Alert } from 'react-native';

export function Graduations() {
  const { user } = useAuth();
  const [martial_art, setMartial_art] = useState('');
  const [description, setDescription] = useState('');

  async function martiaArtAlreadyExists(martial_art: string): Promise<boolean> {
    try {
      const response = await api.get(`martial_art/name/${martial_art}`);
      console.log('a resposta foi: ' + response.data);
      if (response.data.id_martial_art > 0) {
        return response.data.id_martial_art;
      }
      return false;
    } catch (error) {
      console.log(
        'Houve um erro ao verificar se já existia uma arte marcial: ' + error
      );
      return false;
    }
  }

  async function handleRegisterMartialArt() {
    try {
      const id_martial_art = await martiaArtAlreadyExists(martial_art);

      if (id_martial_art) {
        const obj = {
          id_martial_art,
          martial_art,
          description,
          id_dojo: user.id_dojo,
        };

        const response = await api.put(`martial_art/create`, obj);

        if (response) {
          Alert.alert('Aviso', 'Usuário criado com sucesso');
        }
        return response;
      }
    } catch (error: any) {
      Alert.alert('Erro', 'Houve um erro ao cadastrar usuário ' + error);
      console.log('Erro', 'Houve um erro ao cadastrar usuário ' + error);
    }
  }

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
          Artes Marciais
        </Heading>

        <Input
          placeholder="Nome"
          onChangeText={(text: string) => setMartial_art(text)}
          value={martial_art}
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
