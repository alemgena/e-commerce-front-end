import axios from 'axios';
import { baseURL } from '@/config';
export const registerApi = async (data: string) =>
  axios.post(`${baseURL}api/auth/register`, data);
