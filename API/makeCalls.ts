/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable dot-notation */
import axios, { AxiosRequestHeaders } from 'axios';
import { API_ROUTE } from '../utils/constants';
import { APIError } from './Errors';
import { HeaderObj, IAPICallConfig } from './types';

const makeCall = async (config: IAPICallConfig) => {
  let authToken;
  try {
    const fullURL = `${API_ROUTE}${config.route}`;

    const header: HeaderObj = config.header ? { ...config.header } : {};

    if (config.isSecureRoute) {
      const token: any = await localStorage.getItem('token');
      // handle token
      authToken = token || '';
      header.Authorization = `Bearer ${authToken}`;
    }

    // if (config.reCaptchaToken) {
    //   header['RECAPTCHA-RESPONSE'] = config.reCaptchaToken;
    // }

    const response = await axios({
      method: config.method,
      params: config.query,
      data: config.body,
      url: fullURL,
      headers: header as AxiosRequestHeaders,
      responseType: config.responseType || 'json',
    });
    if (response.status === 200 && config.returnCleanResponse) {
      return response;
    } else if (response.status === 200) {
      return response.data;
    } else {
      throw new APIError(response.status, response.data?.message);
    }
  } catch (error: any) {
    if (error?.response) {
      const { response } = error;
      throw new APIError(response?.status, response.data?.message);
    }

    if (error instanceof APIError) throw error;

    throw new APIError(500, 'Something went wrong');
  }
};

export default makeCall;
