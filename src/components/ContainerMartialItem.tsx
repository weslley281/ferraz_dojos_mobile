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

export function ContainerMartialItem({
  data,

  ...rest
}: CardMartialArtsProps) {
  return (
    <TouchableOpacity {...rest}>
      <VStack width={320} height={80} backgroundColor={'green.700'}>
        <Text>{data.martial_art}a</Text>
      </VStack>
    </TouchableOpacity>
  );
}
