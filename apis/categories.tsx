import axios from 'axios'
import { baseURL } from '@/config'
export const getCategoriesAPI = async () => axios.get(`${baseURL}api/categories`);
