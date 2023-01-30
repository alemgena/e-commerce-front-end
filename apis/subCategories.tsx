import axios from 'axios'
import { Url } from '@/utils/url'
export const getSubCategoriesAPI = async (category:string) => axios.get(`${Url}api/categories/${category}/subcategories`)
