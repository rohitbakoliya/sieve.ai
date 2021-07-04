import React, { useEffect, useState } from 'react';
import { CenterContainer, DashboardWrapper } from './Dashboard.style';
import Layout from 'layout/Layout';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table, Tag, Typography } from 'antd';
import useFetch from 'hooks/useFetch';

const { Text } = Typography;

const columns = [
  {
    title: 'Profile',
    key: 'profile',
    dataIndex: 'profile',
    render: (_, r) => (
      <>
        {_.map(tag => (
          <Tag color="geekblue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Job Description',
    key: 'jd',
    dataIndex: 'jd',
    render: jd => (
      <Text ellipsis={true} style={{ width: '250px' }}>
        {jd}
      </Text>
    ),
  },
  {
    title: 'Total Candidates',
    key: 'resumeCount',
    dataIndex: 'resumeCount',
  },
  {
    title: 'Action',
    key: 'jobId',
    render: _ => <Link to={`/results/${_.jobId}`}>View Results</Link>,
  },
];

const Dashboard: React.FC<{}> = () => {
  const history = useHistory();
  const [jobs] = useFetch('/api/jobs', { cache: true });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!jobs) return;
    const jobsArray = jobs.map(job => {
      const { profile, jd, resumes, id } = job;
      return { profile, jd, resumeCount: resumes.length, jobId: id };
    });
    setData(jobsArray);
  }, [jobs]);

  const handleClick = () => {
    history.push('/dashboard/new');
  };
  return (
    <Layout>
      <DashboardWrapper>
        <Button type="primary" onClick={handleClick}>
          Create New Job Hiring
        </Button>
        <br />
        <CenterContainer>
          <Table columns={columns as any} dataSource={data} rowKey={(r: any) => r.jobId} />
        </CenterContainer>
      </DashboardWrapper>
    </Layout>
  );
};
export default Dashboard;
