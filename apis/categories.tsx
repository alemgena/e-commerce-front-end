import axios from 'axios'
import { baseURL } from '@/config'
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
export const getCategoriesAPI = async () => axios.get(`${baseURL}api/categories`);
