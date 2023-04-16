import {
  VStack,
  Center,
  ScrollView,
  HStack,
  Heading,
  Text,
  View,
  Modal,
} from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { HomeHeader } from '@components/HomeHeader';
import { CustomButtonAntDesign } from '@components/ButtonIconAntDesign';
import { CustomButtonIonicons } from '@components/ButtonIconIonicons';
import { CustomButtonSVG1 } from '@components/ButtonIconSVG1';
import { CustomButtonSVG2 } from '@components/ButtonIconSVG2';
import { useState } from 'react';
import { MartialArts } from './modals/MartialArts';

export function Dashboard() {
  const { navigate } = useNavigation<any>();
  const [martialArtModalOpen, setMartialArtModalOpen] = useState(false);

  function handleOpenMartialArtModal() {
    setMartialArtModalOpen(true);
  }

  function handleCloseMartialArtModal() {
    setMartialArtModalOpen(false);
  }

  return (
    <VStack backgroundColor={'blueGray.700'} flex={1}>
      <HomeHeader />

      <VStack px={8}>
        <HStack space={2} alignItems="center" mb={2}>
          <CustomButtonAntDesign icon="adduser" onPress={() => {}} />
          <CustomButtonAntDesign icon="addusergroup" onPress={() => {}} />
          <CustomButtonIonicons icon="school" onPress={() => {}} />
          <CustomButtonAntDesign icon="Trophy" onPress={() => {}} />
        </HStack>
        <HStack space={2} alignItems="center" mb={2}>
          <CustomButtonSVG1 onPress={() => {}} />
          <CustomButtonSVG2 onPress={handleOpenMartialArtModal} />
        </HStack>
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
        <Modal
          isOpen={martialArtModalOpen}
          onClose={handleCloseMartialArtModal}
        >
          <MartialArts handleCloseModal={handleCloseMartialArtModal} />
        </Modal>
      </VStack>
    </VStack>
  );
}
