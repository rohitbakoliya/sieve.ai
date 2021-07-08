import React, { useState } from 'react';
import { message, Upload, UploadProps } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { store } from 'store';
import { addResume } from 'store/ducks';
import { SERVER_URL } from 'config';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const { Dragger } = Upload;

const defaultProps: UploadProps = {
  accept: '.pdf,application/pdf',
  multiple: true,
  maxCount: 100,
  // directory: true,
  withCredentials: true,
  name: 'resume',
  beforeUpload: file => {
    const isPDF = file.type === 'pdf' || file.type === 'application/pdf';
    if (!isPDF) {
      message.error('You can only upload PDF files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('File must smaller than 2MB!');
    }
    return isPDF && isLt2M;
  },
  onChange({ file }) {
    if (file.status === 'done') {
      store.dispatch(addResume(file.response.filename));
    }
  },
  action: `${SERVER_URL}/api/upload`,
};

const UploadFilesWrapper = styled.div`
  margin-top: 100px;
  min-height: 100%;
  width: 100%;
  .ant-checkbox-wrapper {
    margin-bottom: 20px;
  }
`;

const UploadFiles: React.FC<UploadProps> = props => {
  const [checked, setChecked] = useState(true);
  return (
    <UploadFilesWrapper>
      <Checkbox checked={checked} onClick={() => setChecked(!checked)}>
        Upload Folder
      </Checkbox>
      <Dragger {...props} directory={checked}>
        <p className="ant-upload-drag-icon">
          <CloudUploadOutlined />
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
            <br />
            English resumes in PDF format only
            <br />
            Max 2MB invidiual file size
          </p>
        </p>
      </Dragger>
    </UploadFilesWrapper>
  );
};

UploadFiles.defaultProps = defaultProps;

export default UploadFiles;
