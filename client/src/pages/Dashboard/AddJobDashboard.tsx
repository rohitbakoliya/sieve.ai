import React from 'react';
import UploadSteps from 'components/UploadSteps/UploadSteps';
import { DashboardWrapper, CenterContainer } from './Dashboard.style';
import Layout from 'layout/Layout';

const AddJobDashboard: React.FC<{}> = () => {
  return (
    <Layout>
      <DashboardWrapper>
        <CenterContainer>
          <UploadSteps />
        </CenterContainer>
      </DashboardWrapper>
    </Layout>
  );
};
export default AddJobDashboard;
