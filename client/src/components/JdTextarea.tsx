import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const JdTextarea: React.FC = () => {
  return <TextArea maxLength={4000} rows={8} placeholder="Add job description here" allowClear />;
};
export default JdTextarea;
