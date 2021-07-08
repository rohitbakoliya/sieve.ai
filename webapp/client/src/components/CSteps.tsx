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
    flex-direction: column;
    align-items: left;
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
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleNextAction = async () => {
    try {
      setLoading(true);
      await steps[current].action();
      setLoading(false);
      setCurrent(current + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFinalAction = async () => {
    try {
      setLoading(true);
      const { location } = await steps[current].action();
      setLoading(false);
      history.push(location);
    } catch (err) {
      console.log(err);
    }
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
          <Button loading={loading} disabled={loading} type="primary" onClick={handleNextAction}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button loading={loading} disabled={loading} type="primary" onClick={handleFinalAction}>
            View Results
          </Button>
        )}
        {current > 0 && (
          <Button
            loading={loading}
            disabled={loading}
            style={{ margin: '0 8px' }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </CStepsWrapper>
  );
};

export default CSteps;
