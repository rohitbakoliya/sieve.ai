import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, message, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser } from 'store/ducks';
import GoogleButton from 'components/GoogleButton';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const handleLoginForm = (values: { email: string; password: string }) => {
    dispatch(loginUser(values))
      .then(() => message.success('logged in successfully'))
      .catch((err: string) => message.error(err));
  };

  return (
    <Form name="login" onFinish={handleLoginForm}>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input prefix={<UserOutlined />} type="email" placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
      <Divider plain>Or</Divider>
      <GoogleButton />
    </Form>
  );
};
export default LoginForm;
