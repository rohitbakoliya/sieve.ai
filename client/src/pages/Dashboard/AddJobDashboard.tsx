import React from 'react';
import UploadSteps from 'components/UploadSteps/UploadSteps';
import { DashboardNWrapper, CenterContainer } from './Dashboard.style';
import Layout from 'layout/Layout';

const AddJobDashboard: React.FC<{}> = () => {
  return (
    <Layout>
      <DashboardNWrapper>
        <CenterContainer>
          <UploadSteps />
        </CenterContainer>
      </DashboardNWrapper>
    </Layout>
  );
};
export default AddJobDashboard;
