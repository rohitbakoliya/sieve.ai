import React from 'react';
import { LandingWrapper } from './Landing.style';
import Layout from 'layout/Layout';

const LandingPage: React.FC<{}> = () => {
  return (
  <Layout>
    <LandingWrapper>
      <div id="home-left">
        <br />
        <h1>Let Us Sort the Resumes</h1>
        <div className="top-subtitle">
          <h2>
            Designed by over-enthusiastic engineers, our AI-powered 
            platform instantly provides you with eligible candidates
            from your submitted resumes.
            <br /><br />
            Save 90% of your time by leaving the tedious task to the machine.
          </h2>
        </div>
      </div>
    </LandingWrapper>
  </Layout>
  );
  };
  export default LandingPage;