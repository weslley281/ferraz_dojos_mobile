import { Button } from '@components/Button';
import { CustomButtonAntDesign } from '@components/ButtonIconAntDesign';
import { ContainerMartialItem } from '@components/ContainerMartialItem';
import { Input } from '@components/Input';
import { Loading } from '@components/Loading';
import { useAuth } from '@hooks/auth';
import { api } from '@services/api';
import {
  Center,
  HStack,
  Heading,
  ScrollView,
  VStack,
  TextArea,
} from 'native-base';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface Props {
  handleCloseModal: () => void;
}

export function MartialArts({ handleCloseModal }: Props) {
  const { user } = useAuth();
  const [idMartial_art, setIdMartial_art] = useState('');
  const [martial_art, setMartial_art] = useState('');
  const [description, setDescription] = useState('');
  const [martial_arts, setMartial_arts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function martiaArtAlreadyExists(): Promise<boolean> {
    try {
      const response = await api.get(`martial_art/name/${martial_art}`);
      console.log('a resposta foi: ' + response.data);
      if (response.data.id_martial_art > 0) {
        return response.data.id_martial_art;
      }
      return false;
    } catch (error) {
      console.log('A arte marcial é ' + martial_art);
      console.log(
        'Houve um erro ao verificar se já existia uma arte marcial: ' + error
      );
      return false;
    }
  }

  async function handleRegisterMartialArt() {
    if (martial_art === '') {
      return Alert.alert('Aviso', 'Preencha todos os campos');
    }

    try {
      const id_martial_art = await martiaArtAlreadyExists();

      if (idMartial_art !== '') {
        const obj = {
          id_martial_art: idMartial_art,
          martial_art,
          description,
          id_dojo: user.id_dojo,
        };

        const response = await api.put(`martial_art/create`, obj);

        if (response) {
          Alert.alert('Aviso', 'Arte Marcial editada com sucesso');
        }
        getMartialArts();
        return response;
      } else if (id_martial_art) {
        const obj = {
          id_martial_art,
          martial_art,
          description,
          id_dojo: user.id_dojo,
        };

        const response = await api.put(`martial_art/create`, obj);

        if (response) {
          Alert.alert('Aviso', 'Arte Marcial editada com sucesso');
        }

        getMartialArts();
        return response;
      } else {
        const obj = {
          martial_art,
          description,
          id_dojo: user.id_dojo,
        };

        console.log(obj);

        const response = await api.post(`martial_art/create`, obj);

        if (response) {
          Alert.alert('Aviso', 'Arte Marcial criado com sucesso');
        }

        getMartialArts();
        return response;
      }
    } catch (error: any) {
      Alert.alert('Erro', 'Houve um erro ao cadastrar Arte Marcial ' + error);
      console.log('Erro', 'Houve um erro ao cadastrar Arte Marcial ' + error);
    }
  }

  function onEdite(name: string, description: string) {
    setMartial_art(name);
    setDescription(description);
  }

  async function getMartialArts() {
    try {
      setIsLoading(true);
      const response = await api.get(`martial_art/all/${user.id_dojo}`);
      console.log('Type of response:', typeof response.data); // adicionado
      setMartial_arts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(`Erro ao buscar artes marciais: ${error}`);
    }
  }

  useEffect(() => {
    getMartialArts();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <HStack backgroundColor={'blueGray.700'} flex={1}>
        <VStack>
          <HStack width={350} justifyContent={'flex-end'}>
            <CustomButtonAntDesign
              icon="closesquare"
              onPress={handleCloseModal}
            />
          </HStack>
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

            <TextArea
              bg="gray.700"
              px={4}
              borderWidth={0}
              fontSize="md"
              color="white"
              fontFamily="body"
              mb={4}
              placeholder="Description"
              onChangeText={(text: string) => setDescription(text)}
              value={description}
              autoCompleteType={Alert}
            />

            <Button title="Save" onPress={handleRegisterMartialArt} />
          </Center>

          {isLoading ? (
            <Loading />
          ) : (
            <Center>
              {martial_arts.map((item: any) => {
                return (
                  <ContainerMartialItem
                    key={item.id_martial_art}
                    data={item}
                    onPress={() => {
                      onEdite(item.martial_art, item.description);
                      setIdMartial_art(item.id_martial_art);
                    }}
                  />
                );
              })}
            </Center>
          )}
        </VStack>
      </HStack>
    </ScrollView>
  );
}
