import axios from 'axios';
import { baseURL } from '@/config';
export const forgetPasswordApi = async (email: string) =>
  axios.patch(`${baseURL}api/auth/forgetPassword`, email);
