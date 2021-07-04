import http from '../utils/httpInstance';

const getNLPResults = async (payload, cb) => {
  try {
    const { data } = await http.post('/process', payload);
    return data;
  } catch (err) {
    console.log(err);
    cb(new Error('error during NLP data proccessing'));
  }
};

export default getNLPResults;
