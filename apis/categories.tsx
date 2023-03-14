import axios from 'axios'
import { baseURL } from '@/config'
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
console.log('yyyy', process.env.API_URL);
export const getCategoriesAPI = async () =>
  axios.get(`${publicRuntimeConfig?.BACKEND_ENDPOINT}api/categories`);
