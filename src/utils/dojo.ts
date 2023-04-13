import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@services/api';

interface IDojo {
  id_dojo: string;
  dojo: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  paid_out: string;
  createdAt: Date;
  updatedAt: Date;
}
export async function loadDojoStorageData(): Promise<string> {
  const dojoStoraged = await AsyncStorage.getItem('@tokenFerraz');

  if (dojoStoraged) {
    const dojoLogged = dojoStoraged;
    return dojoLogged.toString();
  }
  return '';
}

export async function getDataByToken(token: any): Promise<IDojo> {
  try {
    const response = await api.get(`dojos/id/${token}`);

    const dojo = {
      id_dojo: response.data.id_dojo,
      dojo: response.data.dojo,
      phone: response.data.phone,
      email: response.data.email,
      address_line1: response.data.address_line1,
      address_line2: response.data.address_line2,
      city: response.data.city,
      state: response.data.state,
      country: response.data.country,
      paid_out: response.data.paid_out,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };

    return dojo;
  } catch (error) {
    const dojo = {
      id_dojo: 'Nada aqui',
      dojo: 'Nada aqui',
      phone: 'Nada aqui',
      email: 'Nada aqui',
      address_line1: 'Nada aqui',
      address_line2: 'Nada aqui',
      city: 'Nada aqui',
      state: 'Nada aqui',
      country: 'Nada aqui',
      paid_out: 'Nada aqui',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return dojo;
  }
}
