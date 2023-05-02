import axios from 'axios';
import { baseURL } from '@/config';
export const loginApi = async (data: string) =>
  axios.post(`http://localhost:5000/api/auth/login`, data);
