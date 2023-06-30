import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import '../../Styles/NotFound.scss';

const NotFound = () => {
  return (
    <div className="NotFound-wrapper">
      <h1 className="NotFound-title">404 Not Found</h1>
      <p className="NotFound-description">
        죄송합니다, 페이지를 찾을 수 없습니다.
      </p>
      <Button className="NotFound-btn">
        <Link to="/">메인으로 돌아가기</Link>
      </Button>
    </div>
  );
};

export default NotFound;
