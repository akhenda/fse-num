import Axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { logger } from '@/lib/logger';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const authToken = 'fake_auth_token_from_local_storage';

  if (authToken) config.headers.Authorization = `Bearer ${authToken}`;

  return config;
}

function authRequestInterceptorError(error: unknown) {
  // Do something with request error
  return Promise.reject(error);
}

function errorResponseInterceptor(error: AxiosError & { response: Response }) {
  const status = error.response ? error.response.status : null;

  if (status === 401) {
    // Handle unauthorized access
    logger.error('Unauthorized access', error);
  } else if (status === 400) {
    // Handle bad request errors
    logger.error(
      (error.response.data as { error: string })?.error ?? error.message ?? 'Bad request',
    );
  } else if (status === 404) {
    // Handle not found errors
    logger.error((error.response.data as { error: string })?.error ?? error.message ?? 'Not found');
  } else {
    // Handle other errors
    logger.error('An API error occurred', error);
  }

  return Promise.reject(error);
}

export const axios = Axios.create({ baseURL: 'http://localhost:2024/' });

axios.interceptors.request.use(authRequestInterceptor, authRequestInterceptorError);
axios.interceptors.response.use((res) => res, errorResponseInterceptor);
