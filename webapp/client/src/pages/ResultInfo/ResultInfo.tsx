import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Layout from 'layout/Layout';

const ResultInfo: React.FC = () => {
  const location = useLocation<any>();
  const history = useHistory();
  const parsed = queryString.parse(location.search) as any;

  (!parsed?.rid || !parsed?.jobId || !location.state) && history.push('/dashboard');

  // data contains all the info of user, resume link, score, and tagsScore
  const data = location.state;
  console.log(data);
  return <Layout>use data to display info</Layout>;
};

export default ResultInfo;
