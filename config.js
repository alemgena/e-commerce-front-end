import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
export const baseURL = publicRuntimeConfig?.BACKEND_ENDPOINT;
