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
      const response = await api.post('/dojos/login', { email, password });

      const userLogged = {
        id_dojo: response.data.id_dojo,
        dojo: response.data.dojo,
        phone: response.data.phone,
        email: response.data.email,
        address_line1: response.data.address_line1,
        address_line2: response.data.address_line2,
        city: response.data.city,
        state: response.data.state,
        country: response.data.country,
        password: response.data.password,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
      };

      setUser(userLogged);
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
