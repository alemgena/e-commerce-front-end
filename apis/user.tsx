import axios from 'axios';
import { baseURL } from '@/config';

import { config } from '@/utils/heder';
export const updateProfileApi = async (data: string) =>
  axios.patch(`${baseURL}api/users`, data, config);
export const getUserAPI = async (id: string, config: any) =>
  axios.get(`${baseURL}api/users/${id}`, config);
