import axios from 'axios';
import { Ur2 } from '@/utils/url';
export const forgetPasswordApi = async (email: string) =>
  axios.patch(`${Ur2}api/auth/forgetPassword`, email);
