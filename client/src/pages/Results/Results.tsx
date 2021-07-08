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
import ExportResults from './ExportResults';
interface RecordType {
  name: string;
  email: string;
  phone: string;
  score: number;
  resumeLink: string;
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
    render: (_, r) => (
      <Progress
        strokeColor={{ from: '#7d64a7', to: '#b58bdd' }}
        style={{ paddingLeft: '10px', paddingRight: '10px' }}
        percent={r.score}
      />
    ),
    width: '30%',
  },
  {
    title: 'Resume Profile',
    dataIndex: 'actions',
    render: (_, r) => {
      return (
        <Tag color="purple" key={r._key}>
          {r.data.userInfo.predicted}
        </Tag>
      );
    },
  },
  {
    title: 'Action',
    dataIndex: 'resumeLink',
    key: 'resumeLink',
    render: (_, r) => (
      <a href={r.resumeLink} target="__blank">
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
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!results) return;
    console.log(results);
    const resultsArray = results.map((result, idx) => {
      const { userInfo, score, resumeId } = result;

      // fixing nulls
      Object.keys(userInfo).forEach(key => {
        const value = userInfo[key];
        if (!value) {
          userInfo[key] = 'NA';
        }
      });

      const { name, mobile_number: phone, email } = userInfo;
      const resumeLink = `${SERVER_URL}/api/pdf/${userId}/${resumeId}`;
      return {
        name,
        email,
        phone,
        score,
        _key: idx,
        resumeLink,
        data: { ...result },
      };
    });
    setData(resultsArray);
  }, [results, jobId, userId]);

  error && message.error(error);

  return (
    <Layout>
      <ResultsWrapper>
        <ExportResults data={data} />
        <RTableContainer>
          <Table
            pagination={{ defaultPageSize: 8 }}
            columns={columns}
            loading={isLoading}
            dataSource={data}
            rowKey={r => r._key}
          />
        </RTableContainer>
      </ResultsWrapper>
    </Layout>
  );
};

export default Leaderboard;
