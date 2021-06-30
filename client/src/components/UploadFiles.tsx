import React from 'react';
import { Upload, UploadProps } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const defaultProps: UploadProps = {
  accept: '.doc,.docx,.pdf,application/msword',
  multiple: true,
  maxCount: 100,
  customRequest: options => {
    console.log(options);
  },
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
};

const UploadFiles: React.FC<UploadProps> = props => {
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <CloudUploadOutlined />
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Only .pdf or .doc file formats are allowed
        </p>
      </p>
    </Dragger>
  );
};

UploadFiles.defaultProps = defaultProps;

export default UploadFiles;
