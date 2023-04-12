import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogoSvg from '@assets/logo.svg';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { api } from '@services/api';
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function checkToken() {
    const token = await AsyncStorage.getItem('@tokenFerraz');
    if (token) {
      navigate('home');
    }
  }
  useEffect(() => {
    checkToken();
  }, []);

  async function login() {
    try {
      const response = await api.post('dojos/login', { email, password });
      const token = response.data.token;
      console.log(response.status);
      // await AsyncStorage.setItem('@tokenFerraz', token); // armazenar o token no AsyncStorage

      await AsyncStorage.removeItem('@tokenFerraz');

      await AsyncStorage.setItem('@tokenFerraz', JSON.stringify(token));
      return navigate('home');
    } catch (error) {
      Alert.alert(
        'Aviso',
        `Não foi possível fazer o Login, verifique o email e a senha: ${error}`
      );
      console.error(`Não foi possível fazer o Login error ${error}`);
    }
  }

  function handleNewAccount() {
    navigate('signUp');
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack background={'#808080'} flex={1} px={10} pb={16}>
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo.
          </Text>
        </Center>
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

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar Conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
