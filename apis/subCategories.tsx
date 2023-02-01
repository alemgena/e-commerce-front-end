import axios from 'axios'
import { Url } from '@/utils/url'
export const getSubCategorieAPI = async (id:string) => axios.get(`${Url}api/subcategories/${id}`)
