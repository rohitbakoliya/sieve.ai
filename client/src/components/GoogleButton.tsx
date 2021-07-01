import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { checkAuth } from '../store/ducks';

const GoogleButton = () => {
  const dispatch = useDispatch();
  const authEndPoint = `/api/auth/google`;

  const initOAuthWindow = () => {
    let url = process.env.NODE_ENV === 'development' ? 'localhost:5000' : window.location.host;

    window.open(
      `${window.location.protocol}//${url}${authEndPoint}`,
      '__blank',
      'width=500&height=800'
    );
    window.addEventListener('message', async event => {
      if (event.data === 'success') {
        dispatch(checkAuth())
          .then(() => {
            message.success('Login success');
          })
          .catch((err: string) => {
            message.error(err);
          });
      }
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Button icon={<GoogleOutlined />} onClick={initOAuthWindow} type="primary">
        Continue With Google
      </Button>
    </div>
  );
};
export default GoogleButton;
