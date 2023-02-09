import axios from 'axios'
import { Ur2 } from '@/utils/url'
export const getSubCategorieAPI = async (id:string) => axios.get(`${Ur2}api/subcategories/${id}`)
