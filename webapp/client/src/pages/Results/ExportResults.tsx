import React, { useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';
import { RButtonsContainer } from './Results.style';

interface Props {
  data: any[];
}
const headers = [
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'E-mail',
    key: 'email',
  },
  {
    label: 'Mobile No',
    key: 'data.userInfo.mobile_number',
  },
  {
    label: 'Score',
    key: 'score',
  },
  {
    label: 'Profile',
    key: 'data.userInfo.predicted',
  },
  {
    label: 'Resume Link',
    key: 'resumeLink',
  },
];

const ExportResults: React.FC<Props> = ({ data: csvData }) => {
  const { jobId } = useParams<{ jobId: string }>();
  const [isPreparing, setIsPreparing] = useState(false);
  csvData.sort((d1, d2) => d2.score - d1.score);
  const handleExport = () => {
    setIsPreparing(true);
    setIsPreparing(false);
  };

  return (
    <RButtonsContainer>
      <CSVLink filename={`${jobId}-result.csv`} data={csvData} headers={headers}>
        <Button
          loading={isPreparing}
          type="primary"
          className="export--btn"
          icon={<DownloadOutlined />}
          disabled={!csvData}
          onClick={handleExport}
        >
          Export Result
        </Button>
      </CSVLink>
    </RButtonsContainer>
  );
};
export default ExportResults;
