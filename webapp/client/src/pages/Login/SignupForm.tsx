import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { EditOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { signupUser } from 'store/ducks';

const SignupForm: React.FC = () => {
  const dispatch = useDispatch();
  const handleSignupForm = (values: any) => {
    dispatch(signupUser(values))
      .then(() => message.success('signed up successfully, please login!'))
      .catch((err: string) => message.error(err));
  };

  return (
    <Form name="login" onFinish={handleSignupForm}>
      <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input prefix={<EditOutlined />} placeholder="Name" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input prefix={<UserOutlined />} type="email" placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit">
          Signup
        </Button>
      </Form.Item>
    </Form>
  );
};
export default SignupForm;
