import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppTabRoutes } from './app.tab.routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function Routes() {
  const { colors } = useTheme();
  const [logged, setLogged] = useState(false);

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  async function checkToken() {
    const token = await AsyncStorage.getItem('@tokenFerraz');
    console.log('Se esta autenticado = ' + token);
    if (token) {
      setLogged(true);
    }
  }
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {logged ? <AppTabRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
