import axios from 'axios'
import {Url}from '../utils/url'

export const getProductsAPI = async () => axios.get(`${Url}api/products`)
export const getProductsByFeaturedAPI = async (featured:boolean) => axios.get(`${Url}api/products?featured=${featured}`)
