import { VStack, Center, ScrollView } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

export function Classes() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  return <Center flex={1}></Center>;
}
