const CLIENT_URL_DEV = `http://localhost:3000`;
const CLIENT_URL_PROD = ``;
const SERVER_URL_DEV = `http://localhost:5000`;
const SERVER_URL_PROD = ``;
const NLP_URL_DEV = `http://localhost:5002`;
const NLP_URL_PROD = `http://localhost:5002`;

export const CLIENT_URL = process.env.NODE_ENV === 'production' ? CLIENT_URL_PROD : CLIENT_URL_DEV;
export const SERVER_URL = process.env.NODE_ENV === 'production' ? SERVER_URL_PROD : SERVER_URL_DEV;
export const NLP_URL = process.env.NODE_ENV === 'production' ? NLP_URL_PROD : NLP_URL_DEV;
