import axios from 'axios';
import { Ur2 } from '@/utils/url';
import { config } from '@/utils/heder';
export const addFavoriteApi = async (data: string) =>
  axios.post(`${Ur2}api/favourites`, data,config);
export const getFavouriteAPI = async () =>
  axios.get(`${Ur2}api/favourites`,config);