import { Text, VStack } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface MartialArtsProps {
  id_martial_art: string;
  martial_art: string;
  description: string;
}

interface CardMartialArtsProps extends TouchableOpacityProps {
  data: MartialArtsProps;
}

export function ContainerMartialItem({ data, ...rest }: CardMartialArtsProps) {
  return (
    <TouchableOpacity {...rest}>
      <VStack
        borderRadius={8}
        mt={3}
        width={320}
        height={10}
        backgroundColor={'blue.800'}
      >
        <Text color={'gray.100'} px={5} py={2}>
          {data.martial_art}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
}
