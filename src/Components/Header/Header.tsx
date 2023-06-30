import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { useCookies } from 'react-cookie';
import { authenticateApi } from 'api';
import 'Styles/Header.scss';

const Header = () => {
  const navigate = useNavigate(); // 페이지 이동
  const [cookies, , removeCookie] = useCookies(['accessToken']);
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
    navigate(`/`);
    removeCookie('accessToken');
  }

  async function handleMyPage() {
    navigate(`/mypage`);
  }

  return (
    <section className="header">
      <Row className="header__inner">
        <Col>
          <Link to="/">
            <div className="header__logo">OP-AL</div>
            <div className="header__logo--info">
              Old People with Active Life
            </div>
          </Link>
        </Col>
        <Col className="header__login">
          {accessToken ? (
            <>
              <span className="header__login--nickname">
                환영합니다! {displayName}님
              </span>
              <Button
                type="text"
                onClick={handleLogout}
                className="btn btn__logout"
              >
                로그아웃
              </Button>
              <Button onClick={handleMyPage} className="btn">
                마이페이지
              </Button>
            </>
          ) : (
            <Button onClick={handleSignIn} className="btn">
              로그인
            </Button>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default Header;
