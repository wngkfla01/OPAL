import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>죄송합니다, 페이지를 찾을 수 없습니다.</p>
      <Button>
        <Link to="/">메인으로 돌아가기</Link>
      </Button>
    </div>
  );
};

export default NotFound;
