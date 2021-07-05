import axios from 'axios';
import { NLP_URL } from '../config';

const instance = axios.create({
  baseURL: NLP_URL,
  withCredentials: true
});

instance.interceptors.response.use(undefined, error => {
  if (axios.isCancel(error)) {
    console.log(`request cancelled`);
  }
  return Promise.reject(error.response?.data?.error);
});

export default instance;
