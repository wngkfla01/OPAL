import React, { useState } from 'react';
import SearchBar from 'Components/Contents/SearchBar';
import Category from 'Components/Contents/Category';
import Event from 'Components/Contents/Event';
import QuickMenu from 'Components/Contents/QuickMenu';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <main className="inner">
        <SearchBar onSearch={handleSearch} />
        <Category onSearch={handleSearch} />
        <Event />
        <QuickMenu />
      </main>
    </>
  );
};

export default Home;
