import axios from 'axios'
import {Ur2}from '../utils/url'

export const getProductsAPI = async () => axios.get(`${Ur2}api/products`)
export const getProductsByFeaturedAPI = async (featured: boolean) =>
  axios.get(
    `${Ur2}api/products?filters=[{"featured":${featured}}]`
  );
export const getProductAPI = async (id:string) => axios.get(`${Ur2}api/products/${id}`);