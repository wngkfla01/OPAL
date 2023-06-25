import React from 'react';
import { RootState } from 'redux/reducer/reducer';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [cookies] = useCookies(['accessToken']);

  console.log('홈에서 사용자토큰', cookies);

  return <div>이건 홈이닷</div>;
};

export default Home;
