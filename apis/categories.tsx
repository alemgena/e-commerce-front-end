import axios from 'axios'
import {Ur2}from '../utils/url'
export const getCategoriesAPI = async () => axios.get(`${Ur2}api/categories`)
