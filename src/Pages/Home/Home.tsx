import React, { useState } from 'react';
import { RootState } from 'redux/reducer/reducer';
import { useSelector } from 'react-redux';

const Home = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const [userToken, setUserToken] = useState(userInfo.accessToken);

  const user = {
    email: userInfo.user.email,
    displayName: userInfo.user.displayName,
  };
  console.log('메인페이지에서의 user정보', user, userInfo.accessToken);
  console.log('사용자 로그아웃됨', userInfo.user.displayName);
  console.log('사용자 토큰', userToken.length);

  return <div>이건 홈이닷</div>;
};

export default Home;
