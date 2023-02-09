import axios from 'axios';
import { Ur2 } from '../utils/url';
export const getShopsAPI = async () => axios.get(`${Ur2}api/shops`);
