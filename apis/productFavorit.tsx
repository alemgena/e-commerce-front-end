import axios from 'axios';
import { Url } from '@/utils/url';
export const addFavoriteApi = async (data: string) =>
  axios.post(`${Url}api/favourites`,data);
export const getFavouriteAPI = async (id: string) =>
  axios.get(`${Url}api/favourites/${id}`);