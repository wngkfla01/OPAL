import React from 'react';
import { useCookies } from 'react-cookie';
import SearchBar from 'Components/Contents/SearchBar';
import Category from 'Components/Contents/Category';
import Event from 'Components/Contents/Event';
import QuickMenu from 'Components/Contents/QuickMenu';

const Home = () => {
  const [cookies] = useCookies(['accessToken']);

  console.log('홈에서 사용자토큰', cookies);

  return (
    <>
      <main className="inner">
        <SearchBar />
        <Category />
        <Event />
        <QuickMenu />
      </main>
    </>
  );
};

export default Home;
