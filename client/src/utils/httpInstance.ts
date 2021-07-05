import axios, { AxiosError, AxiosInstance } from 'axios';
import { SERVER_URL } from 'config';

const instance: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true
});

instance.interceptors.response.use(undefined, (error: AxiosError) => {
  if (axios.isCancel(error)) {
    console.log(`request cancelled`);
  }
  return Promise.reject(error.response?.data?.error);
});

export default instance;
