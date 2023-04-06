import axios from 'axios';
import { baseURL } from '@/config';
export const getShopsAPI = async () => axios.get(`${baseURL}api/shops`);
