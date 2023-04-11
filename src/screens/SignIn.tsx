import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogoSvg from '@assets/logo.svg';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { api } from '@services/api';
import { Alert } from 'react-native';

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  async function login(email: string, password: string) {
    try {
      const response = await api.post('/login', { email, password });
      const token = response.data.token;
      await AsyncStorage.setItem('@tokenFerraz', token); // armazenar o token no AsyncStorage
      Alert.alert;
    } catch (error) {
      Alert.alert(
        'Aviso',
        `Não foi possível fazer o Login, verifique o email e a senha`
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
          />

          <Input placeholder="Senha" secureTextEntry />

          <Button title="Acessar" />
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
