import React, { useEffect, useState } from 'react';
import { CenterContainer, DashboardWrapper } from './Dashboard.style';
import Layout from 'layout/Layout';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table } from 'antd';
import useFetch from 'hooks/useFetch';

const columns = [
  {
    title: 'Job Name',
    key: 'jobName',
    dataIndex: 'jobName',
  },
  {
    title: 'Job Description',
    key: 'jd',
    dataIndex: 'jd',
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
      const { jobName, jd, resumes, id } = job;
      return { jobName, jd, resumeCount: resumes.length, jobId: id };
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
          <Table columns={columns} dataSource={data} rowKey={(r: any) => r.jobId} />
        </CenterContainer>
      </DashboardWrapper>
    </Layout>
  );
};
export default Dashboard;
