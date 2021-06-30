import React from 'react';
import GoogleButton from 'components/GoogleButton';
import { LandingWrapper } from './Landing.style';

const LandingPage: React.FC<{}> = () => {
  return (
    <LandingWrapper>
      <GoogleButton />
    </LandingWrapper>
  );
};
export default LandingPage;
