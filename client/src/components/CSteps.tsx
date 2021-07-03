import React, { useState } from 'react';
import { Steps, Button } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const { Step } = Steps;

const CStepsWrapper = styled.div`
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

export interface ICStep {
  title: string;
  content: React.ReactNode;
  action: () => any;
}

interface ICSteps {
  steps: ICStep[];
}

const CSteps: React.FC<ICSteps> = ({ steps }) => {
  const [current, setCurrent] = useState(0);
  const history = useHistory();

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleNextAction = async () => {
    await steps[current].action();
    setCurrent(current + 1);
  };

  const handleFinalAction = async () => {
    const { location } = steps[current].action();
    history.push(location);
  };

  return (
    <CStepsWrapper>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={handleNextAction}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleFinalAction}>
            View Results
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </CStepsWrapper>
  );
};

export default CSteps;
