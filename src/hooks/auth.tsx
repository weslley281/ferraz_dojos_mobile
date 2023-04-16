import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@services/api';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id_dojo: string;
  dojo: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

interface IAuthContextData {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@tokenFerraz:user';

  async function signIn(email: string, password: string) {
    try {
      const responseLogin = await api.post('/dojos/login', { email, password });
      const responseGet = await api.get(
        `/dojos/id/${responseLogin.data.id_dojo}`
      );

      const userLogged = {
        id_dojo: responseLogin.data.id_dojo,
        dojo: responseGet.data.dojo,
        phone: responseGet.data.phone,
        email: responseGet.data.email,
        address_line1: responseGet.data.address_line1,
        address_line2: responseGet.data.address_line2,
        city: responseGet.data.city,
        state: responseGet.data.state,
        country: responseGet.data.country,
        password: responseGet.data.password,
        createdAt: responseGet.data.createdAt,
        updatedAt: responseGet.data.updatedAt,
        token: responseLogin.data.token,
      };

      setUser(userLogged);
      console.log(userLogged);
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
