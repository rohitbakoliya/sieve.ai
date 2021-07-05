import { message, Progress, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { SERVER_URL } from 'config';
import useFetch from 'hooks/useFetch';
import Layout from 'layout/Layout';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StoreState } from 'store';
import { ResultsWrapper, RTableContainer } from './Results.style';

interface RecordType {
  name: string;
  email: string;
  score: number;
  resumeId: string;
  _key: number;
  data: any;
}

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
    title: 'Resume Profile',
    dataIndex: 'actions',
    render: (_, r) => {
      return (
        <Tag color="purple" key={r.resumeId}>
          {r.data.userInfo.predicted}
        </Tag>
      );
    },
  },
  {
    title: 'Action',
    dataIndex: 'viewResume',
    render: (_, r) => (
      <a href={`${SERVER_URL}/api/pdf/${r.data.userId}/${r.resumeId}`} target="__blank">
        View Resume
      </a>
    ),
  },
];

const Leaderboard: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const userId = useSelector((state: StoreState) => state.auth.user?.id);
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

      return { name, email, score, resumeId, _key: idx, data: { ...result, jobId, userId } };
    });
    setData(resultsArray);
  }, [results, jobId, userId]);

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
