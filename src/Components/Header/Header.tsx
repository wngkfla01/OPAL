import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';
import { useCookies } from 'react-cookie';
import { authenticateApi } from 'api';

const { Title } = Typography;

const Header = () => {
  const navigate = useNavigate(); // 페이지 이동
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const [displayName, setDisplayName] = useState('');
  const accessToken = cookies.accessToken;

  if (accessToken) {
    const fetchData = async () => {
      const logInData = await authenticateApi(accessToken);
      setDisplayName(logInData.displayName);
    };
    fetchData();
  }

  async function handleSignIn() {
    navigate(`/signin`);
  }

  async function handleLogout() {
    removeCookie('accessToken');
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
            <span>환영합니다! {displayName}님</span>
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
