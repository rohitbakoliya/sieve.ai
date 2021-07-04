import { message, Progress, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import useFetch from 'hooks/useFetch';
import Layout from 'layout/Layout';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ResultsWrapper, RTableContainer } from './Results.style';

interface RecordType {
  name: string;
  email: string;
  score: number;
  resumeId: string;
  _key: number;
  data: any;
}

const dataSource = [
  {
    name: 'rohit',
    email: 'email@gmail.com',
    score: 40,
    resumeId: '/#',
    _key: 121,
  },
  {
    name: 'john',
    email: 'email@gmail.com',
    score: 70,
    resumeId: '/#',
    _key: 122,
  },
  {
    name: 'foo bar',
    email: 'foobar@yahoo.com',
    score: 96,
    resumeId: '/#',
    _key: 123,
  },
];

const columns: ColumnsType<RecordType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.score - b.score,
    render: (_, r) => <Progress percent={r.score} />,
    width: 350,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    render: (_, r) => {
      return (
        <Link
          to={{
            pathname: `/result?rid=${r.resumeId}&jobId=${r.data.jobId}`,
            state: { data: r.data },
          }}
        >
          View Complete Result
        </Link>
      );
    },
  },
];

const Leaderboard: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const URL = `/api/jobs/${jobId}/results`;
  const [results, isLoading, error] = useFetch(URL);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!results) return;
    console.log(results);
    const resultsArray = results.map((result, idx) => {
      const {
        userInfo: { name, email },
        score,
        resumeId,
      } = result;

      return { name, email, score, resumeId, _key: idx, data: { ...result, jobId } };
    });
    setData(resultsArray);
  }, [results, jobId]);

  error && message.error(error);

  return (
    <Layout>
      <ResultsWrapper>
        <RTableContainer>
          <Table columns={columns} loading={isLoading} dataSource={data} rowKey={r => r._key} />
        </RTableContainer>
      </ResultsWrapper>
    </Layout>
  );
};

export default Leaderboard;
