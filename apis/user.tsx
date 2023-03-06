import axios from 'axios';
import { Ur2 } from '@/utils/url';
import { config } from '@/utils/heder';
export const updateProfileApi = async (data: string) =>
  axios.patch(`${Ur2}api/users`, data, config);
export const getUserAPI = async (id: string, config:any) =>
  axios.get(`${Ur2}api/users/${id}`, config);
