import React from 'react';
import UploadSteps from 'components/UploadSteps';
import { DashboardWrapper, UploadStepsContainer } from './Dashboard.style';
import Layout from 'layout/Layout';

const Dashboard: React.FC<{}> = () => {
  return (
    <Layout>
      <DashboardWrapper>
        <UploadStepsContainer>
          <UploadSteps />
        </UploadStepsContainer>
      </DashboardWrapper>
    </Layout>
  );
};
export default Dashboard;
