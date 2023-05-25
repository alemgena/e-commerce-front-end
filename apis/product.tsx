import axios from 'axios'
import { baseURL } from '@/config';
export const getProductsAPI = async () => axios.get(`${baseURL}api/products`)
export const getProductsByFeaturedAPI = async () =>
  axios.get(
    `${baseURL}api/products`
  );
export const getProductAPI = async (id:string) => axios.get(`${baseURL}api/products/${id}`);