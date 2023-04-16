import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { Routes } from '@routes/index';

import { THEME } from './src/theme';

import { Loading } from '@components/Loading';

import { AuthProvider, useAuth } from './src/hooks/auth';

export default function App() {
  const { userStorageLoading } = useAuth();
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        {fontsLoaded || userStorageLoading ? <Routes /> : <Loading />}
      </AuthProvider>
    </NativeBaseProvider>
  );
}
