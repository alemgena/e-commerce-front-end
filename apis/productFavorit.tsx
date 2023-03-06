import axios from 'axios';
import { Ur2 } from '@/utils/url';
export const addFavoriteApi = async (data: string,config:any) =>
  axios.post(`${Ur2}api/favorites`, data, config);
export const getFavouriteAPI = async (config:any) => axios.get(`${Ur2}api/favorites`, config);