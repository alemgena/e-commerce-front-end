import axios from 'axios';
import { baseURL } from '@/config';
export const loginApi = async (data: string) =>
  axios.post(`${baseURL}/api/auth/login`, data);
