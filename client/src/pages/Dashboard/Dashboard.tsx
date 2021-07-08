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
          <Tag color="purple" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
    width: '40%',
  },
  {
    title: 'Job Description',
    key: 'jd',
    dataIndex: 'jd',
    render: jd => (
      <Text ellipsis={true} style={{ width: '500px' }}>
        {jd}
      </Text>
    ),
  },
  {
    title: 'Total Candidates',
    key: 'resumeCount',
    dataIndex: 'resumeCount',
    width: '20%',
    align: 'right',
  },
  {
    title: 'Action',
    key: 'jobId',
    render: _ => <Link to={`/results/${_.jobId}`}>View Results</Link>,
    width: '20%',
    align: 'center',
  },
];

const Dashboard: React.FC<{}> = () => {
  const history = useHistory();
  const [jobs, loading] = useFetch('/api/jobs');
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
        <CenterContainer>
          <Table
            loading={loading}
            pagination={{ pageSize: 8 }}
            columns={columns as any}
            dataSource={data}
            rowKey={(r: any) => r.jobId}
          />
        </CenterContainer>
      </DashboardWrapper>
    </Layout>
  );
};
export default Dashboard;
