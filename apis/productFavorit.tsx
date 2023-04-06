import axios from 'axios';
import { baseURL } from '@/config';
export const addFavoriteApi = async (data: string,config:any) =>
  axios.post(`${baseURL}api/favorites`, data, config);
export const getFavouriteAPI = async (config:any) => axios.get(`${baseURL}api/favorites`, config);