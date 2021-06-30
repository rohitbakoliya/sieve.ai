import React from 'react';
import UploadFiles from 'components/UploadFiles';
import PdfViewer from 'components/PdfViewer';
import { DashboardWrapper } from './Dashboard.style';

const Dashboard: React.FC<{}> = () => {
  return (
    <DashboardWrapper>
      {/* <UploadFiles /> */}
      <PdfViewer />
    </DashboardWrapper>
  );
};
export default Dashboard;
