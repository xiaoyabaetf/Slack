import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Result
      status='404'
      title='404'
      subTitle='迷路了'
      extra={<Button type='primary'><Link to='/home'>首页</Link></Button>}
    />
  );
}

export default NotFound;
