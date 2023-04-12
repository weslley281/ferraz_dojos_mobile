import { useEffect, useState } from 'react';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { states } from '../utils/states';
import { Alert } from 'react-native';
import { api } from '@services/api';

export function SignUp() {
  const { goBack, navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const [dojo, setDojo] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Brasil');

  function formatPhoneNumber() {
    // Limpa qualquer caractere que não seja número
    let modifyPhoneNumber = phoneNumber;
    modifyPhoneNumber = modifyPhoneNumber.replace(/\D/g, '');

    // Formata o número de acordo com o padrão brasileiro
    if (modifyPhoneNumber.length === 11) {
      // Formato para telefone celular: (99) 99999-9999
      const phoneNumberFormated = modifyPhoneNumber.replace(
        /(\d{2})(\d{5})(\d{4})/,
        '($1) $2-$3'
      );
      return setPhoneNumber(phoneNumberFormated);
    } else if (modifyPhoneNumber.length === 10) {
      // Formato para telefone fixo: (99) 9999-9999
      const phoneNumberFormated = modifyPhoneNumber.replace(
        /(\d{2})(\d{4})(\d{4})/,
        '($1) $2-$3'
      );
      return setPhoneNumber(phoneNumberFormated);
    } else {
      // Retorna o número original se não for possível formatá-lo
      return setPhoneNumber(modifyPhoneNumber);
    }
  }

  async function registerDojo() {
    if (
      dojo === '' ||
      selectedState === null ||
      phoneNumber === '' ||
      email === '' ||
      addressLine1 === '' ||
      addressLine2 === '' ||
      city === '' ||
      country === '' ||
      password === ''
    ) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    const obj = {
      dojo,
      password,
      address_line1: addressLine1,
      address_line2: addressLine2,
      city,
      state: selectedState,
      country,
      phone: phoneNumber,
      email,
    };

    console.log(obj);

    try {
      const response = await api.post('dojos/create', obj);
      console.log(response.status);
      Alert.alert('Alerta', 'Conta criado com sucesso: ' + response.status);
      navigate('signIn');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Erro', error.message);
    }
  }

  // useEffect(() => {
  //   () => console.log(selectedState);
  // }, [selectedState]);

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
            Crie a sua conta
          </Heading>

          <Input
            placeholder="Nome"
            onChangeText={(text: string) => setDojo(text)}
            value={dojo}
          />
          <Input
            placeholder="Endereço Linha 1"
            onChangeText={(text: string) => setAddressLine1(text)}
            value={addressLine1}
          />
          <Input
            placeholder="Endereço Linha 2"
            onChangeText={(text: string) => setAddressLine2(text)}
            value={addressLine2}
          />
          <Input
            placeholder="Cidade"
            onChangeText={(text: string) => setCity(text)}
            value={city}
          />

          <RNPickerSelect
            placeholder={{ label: 'Selecione um estado', value: null }}
            items={states}
            onValueChange={(value) => setSelectedState(value)}
            value={selectedState}
          />

          <Input
            value="Brasil"
            onChangeText={(text: string) => setCountry(text)}
          />

          <Input
            placeholder="Telefone"
            keyboardType="numeric"
            onChangeText={(text: string) => setPhoneNumber(text)}
            onBlur={formatPhoneNumber}
            value={phoneNumber}
          />

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

          <Button title="Criar e Acessar" onPress={() => registerDojo()} />
        </Center>

        <Button
          mt={24}
          title="Voltar a Tela de Login"
          variant="outline"
          onPress={() => goBack()}
        />
      </VStack>
    </ScrollView>
  );
}
