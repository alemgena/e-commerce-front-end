import axios from 'axios'
import { baseURL } from '@/config';
export const getSubCategorieAPI = async (id:string) => axios.get(`${baseURL}api/subcategories/${id}`)
