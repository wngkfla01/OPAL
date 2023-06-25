import React from 'react';
import { RootState } from 'redux/reducer/reducer';
import { useCookies } from 'react-cookie';
import SearchBar from 'Components/Contents/SearchBar';
import Catagory from 'Components/Contents/Catagory';

const Home = () => {
  const [cookies] = useCookies(['accessToken']);

  console.log('홈에서 사용자토큰', cookies);

  return (
    <>
      <SearchBar />
      <Catagory />
    </>
  );
};

export default Home;
