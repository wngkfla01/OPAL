import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 3rem;
`;

const Header = () => {
  const navigate = useNavigate(); //페이지 이동
  const accessToken = localStorage.getItem('token'); // localStorage에서 accessToken 가져오기

  async function handleSignIn() {
    navigate(`/signin`);
  }

  async function handleLogout() {
    localStorage.removeItem('token'); // localStorage에서 accessToken 제거
    navigate(`/`);
  }

  async function handleMyPage() {
    navigate(`/`);
  }

  return (
    <>
      <MainHeader>
        <Title>OP-AL</Title>
        <div>
          {accessToken ? (
            <>
              <button onClick={handleLogout}>로그아웃</button>
              <button onClick={handleMyPage}>마이페이지</button>
            </>
          ) : (
            <>
              <button onClick={handleSignIn}>로그인</button>
            </>
          )}
        </div>
      </MainHeader>
    </>
  );
};

export default Header;
