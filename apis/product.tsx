import axios from 'axios'
import { baseURL } from '@/config';
export const getProductsAPI = async () => axios.get(`${baseURL}api/products`)
export const getProductsByFeaturedAPI = async (featured: boolean) =>
  axios.get(
    `${baseURL}api/products?filters=[{"featured":${featured}}]`
  );
export const getProductAPI = async (id:string) => axios.get(`${baseURL}api/products/${id}`);