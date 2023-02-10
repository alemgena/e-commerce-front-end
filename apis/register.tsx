import axios from 'axios';
import { Ur2 } from '@/utils/url';
export const registerApi = async (data: string) =>
  axios.post(`${Ur2}api/auth/register`, data);
