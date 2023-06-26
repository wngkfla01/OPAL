import React from 'react';
import { useCookies } from 'react-cookie';
import SearchBar from 'Components/Contents/SearchBar';
import Catagory from 'Components/Contents/Catagory';
import Event from 'Components/Contents/Event';

const Home = () => {
  const [cookies] = useCookies(['accessToken']);

  console.log('홈에서 사용자토큰', cookies);

  return (
    <>
      <SearchBar />
      <Catagory />
      <Event />
    </>
  );
};

export default Home;
