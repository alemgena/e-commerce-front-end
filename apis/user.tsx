import axios from 'axios';
import { baseURL } from '@/config';
export const updateProfileApi = async (data: string, config: any) =>
  axios.patch(`${baseURL}api/users`, data, config);
export const getUserAPI = async (id: string, config: any) =>
  axios.get(`${baseURL}api/users/${id}`, config);
