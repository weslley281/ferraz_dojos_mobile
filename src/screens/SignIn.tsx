import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  View,
  HStack,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogoSvg from '@assets/logo.svg';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { useNavigation } from '@react-navigation/native';

import { api } from '@services/api';
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Loading } from '@components/Loading';
import { useAuth } from '@hooks/auth';

export function SignIn() {
  const { navigate } = useNavigation<any>();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setIsLoading] = useState(false);

  async function login() {
    try {
      setIsLoading(true);
      return await signIn(email, password);
    } catch (error) {
      console.log('Não foi possível conectar a conta: ' + error);
      Alert.alert('Não foi possível conectar a conta: ' + error);
      setIsLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack backgroundColor={'blueGray.500'} flex={1} px={10} pb={16}>
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treinar ajuda na evolução da sua mente.
          </Text>
        </Center>
        {loading ? (
          <Loading />
        ) : (
          <Center>
            <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
              Acesse a sua conta
            </Heading>

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text: string) => setEmail(text)}
              value={email}
            />

            <Input
              placeholder="Senha"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(text: string) => setPassword(text)}
              value={password}
            />

            <Button title="Acessar" onPress={login} />
          </Center>
        )}
        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar Conta"
            variant="outline"
            onPress={() => navigate('SignUp')}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
