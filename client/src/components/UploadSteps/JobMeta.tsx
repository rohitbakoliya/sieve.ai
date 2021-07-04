import React from 'react';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { addJd } from 'store/ducks';
import JobProfile from './JobProfile';
const { TextArea } = Input;

const JobMeta: React.FC = () => {
  const dispatch = useDispatch();
  const jd = useSelector((state: StoreState) => state.stepsContent.jd);

  const handleJDChange = e => dispatch(addJd(e.target.value));

  return (
    <>
      <JobProfile />
      <br />
      <br />
      <TextArea
        maxLength={4000}
        onChange={handleJDChange}
        rows={8}
        value={jd}
        placeholder="Paste your job description here"
        allowClear
      />
    </>
  );
};
export default JobMeta;
