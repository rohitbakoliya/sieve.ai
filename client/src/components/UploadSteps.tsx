import { Steps, Button, message } from 'antd';
import React from 'react';
import styled from 'styled-components';
import UploadFiles from './UploadFiles';
import JdTextArea from './JdTextarea';

const { Step } = Steps;

const steps = [
  {
    title: 'Add Job Description',
    content: <JdTextArea />,
  },
  {
    title: 'Add Tags',
    content: '<ADdJR />',
  },
  {
    title: 'Upload Resumes',
    content: <UploadFiles />,
  },
];

const UploadStepsWrapper = styled.div`
  .steps-action {
    margin-top: 20px;
  }
  .steps-content {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
  }
`;

const UploadSteps: React.FC = () => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <UploadStepsWrapper>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </UploadStepsWrapper>
  );
};

export default UploadSteps;
