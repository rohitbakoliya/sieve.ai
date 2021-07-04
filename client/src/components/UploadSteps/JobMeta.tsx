import React from 'react';
import { Input, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { addJd, addJobName } from 'store/ducks';
const { TextArea } = Input;

const JobMeta: React.FC = () => {
  const dispatch = useDispatch();
  const jd = useSelector((state: StoreState) => state.stepsContent.jd);
  const jobName = useSelector((state: StoreState) => state.stepsContent.jobName);

  const handleJDChange = e => dispatch(addJd(e.target.value));
  const handleJNChange = e => dispatch(addJobName(e.target.value));

  return (
    <Form labelCol={{ span: 3 }} labelAlign="left" style={{ width: '100%' }}>
      <Form.Item required label="Job Name">
        <Input placeholder="Add your job name here" onChange={handleJNChange} value={jobName} />
      </Form.Item>
      <Form.Item required label="Job Description">
        <TextArea
          maxLength={4000}
          onChange={handleJDChange}
          rows={8}
          value={jd}
          placeholder="Paste your job description here"
          allowClear
        />
      </Form.Item>
    </Form>
  );
};
export default JobMeta;
