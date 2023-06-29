import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from 'Components/Contents/SearchBar';
import ProductItem from 'Pages/ProductList/ProductItem';
import 'Styles/common.scss';

const ProductList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <main className="inner">
      <SearchBar onSearch={handleSearch} />
      <ProductItem searchQuery={searchQuery} />
    </main>
  );
};

export default ProductList;
