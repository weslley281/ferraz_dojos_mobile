import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.1.2:5000',

  // baseURL: 'http://192.168.15.41:5000',
});
