import React from 'react';
import Layout from 'layout/Layout';
import { FormsContainer, LoginWrapper } from './Login.style';
import { Tabs } from 'antd';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const { TabPane } = Tabs;

const Login: React.FC = () => {
  return (
    <Layout>
      <LoginWrapper>
        <FormsContainer>
          <Tabs defaultActiveKey="1" centered size="large">
            <TabPane tab="Login" key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab="Singup" key="2">
              <SignupForm />
            </TabPane>
          </Tabs>
        </FormsContainer>
      </LoginWrapper>
    </Layout>
  );
};

export default Login;
