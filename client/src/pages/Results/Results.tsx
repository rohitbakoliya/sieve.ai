import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Layout from 'layout/Layout';
import React from 'react';
import { ResultsWrapper, RTableContainer } from './Results.style';

interface RecordType {
  name: string;
  email: string;
  score: number;
  link: string;
}

const dataSource = [
  {
    name: 'rohit',
    email: 'email@gmail.com',
    score: 40,
    link: '/#',
  },
  {
    name: 'john',
    email: 'email@gmail.com',
    score: 70,
    link: '/#',
  },
  {
    name: 'foo bar',
    email: 'foobar@yahoo.com',
    score: 96,
    link: '/#',
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
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (_, r) => {
      return <a href={r.link}> View Resume </a>;
    },
  },
];

const Leaderboard: React.FC = () => {
  const data = dataSource;
  return (
    <Layout>
      <ResultsWrapper>
        <RTableContainer>
          <Table columns={columns} dataSource={data} />
        </RTableContainer>
      </ResultsWrapper>
    </Layout>
  );
};

export default Leaderboard;
