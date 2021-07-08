import React from 'react';
import UploadSteps from 'components/UploadSteps/UploadSteps';
import { DashboardNWrapper, CenterNContainer } from './Dashboard.style';
import Layout from 'layout/Layout';

const AddJobDashboard: React.FC<{}> = () => {
  return (
    <Layout>
      <DashboardNWrapper>
        <CenterNContainer>
          <UploadSteps />
        </CenterNContainer>
      </DashboardNWrapper>
    </Layout>
  );
};
export default AddJobDashboard;
