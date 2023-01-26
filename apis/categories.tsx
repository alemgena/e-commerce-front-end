import axios from 'axios'
import {Url}from '../utils/url'
export const getCategoriesAPI = async () => axios.get(`${Url}/categories`)
