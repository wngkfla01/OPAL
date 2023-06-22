import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';
import { userValue, initialStateUser } from 'redux/reducer/reducer';
import { useDispatch } from 'react-redux';

const { Title } = Typography;

const Header = () => {
  const navigate = useNavigate(); // 페이지 이동
  const accessToken = localStorage.getItem('token'); // localStorage에서 accessToken 가져오기
  const dispatch = useDispatch();

  async function handleSignIn() {
    navigate(`/signin`);
  }

  async function handleLogout() {
    localStorage.removeItem('token');
    dispatch(userValue(initialStateUser));
    navigate(`/`);
  }

  async function handleMyPage() {
    navigate(`/mypage`);
  }

  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Link to="/">
          <Title level={1}>OP-AL</Title>
        </Link>
      </Col>
      <Col>
        {accessToken ? (
          <>
            <Button onClick={handleLogout}>로그아웃</Button>
            <Button onClick={handleMyPage}>마이페이지</Button>
          </>
        ) : (
          <Button onClick={handleSignIn}>로그인</Button>
        )}
      </Col>
    </Row>
  );
};

export default Header;
