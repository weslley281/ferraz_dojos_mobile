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

export function SignUp() {
  const { goBack } = useNavigation<AuthNavigatorRoutesProps>();

  const [selectedState, setSelectedState] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (formatted: any, extracted: any) => {
    setPhoneNumber(extracted);
  };

  function formatPhoneNumber(phoneNumber: string) {
    // Limpa qualquer caractere que não seja número
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Formata o número de acordo com o padrão brasileiro
    if (phoneNumber.length === 11) {
      // Formato para telefone celular: (99) 99999-9999
      return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (phoneNumber.length === 10) {
      // Formato para telefone fixo: (99) 9999-9999
      return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      // Retorna o número original se não for possível formatá-lo
      return phoneNumber;
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

          <Input placeholder="Nome" />
          <Input placeholder="Endereço Linha 1" />
          <Input placeholder="Endereço Linha 2" />
          <Input placeholder="Cidade" />

          <RNPickerSelect
            placeholder={{ label: 'Selecione um estado', value: null }}
            items={states}
            onValueChange={(value) => setSelectedState(value)}
            value={selectedState}
          />

          <Input value="Brasil" />

          <Input placeholder="Telefone" keyboardType="numeric" />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />

          <Button title="Criar e Acessar" />
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
