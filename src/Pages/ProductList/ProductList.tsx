import React from 'react';
import SearchBar from 'Components/Contents/SearchBar';
import ProductItem from 'Pages/ProductList/ProductItem';
import 'Styles/common.scss';

const ProductList = () => {
  return (
    <main className="inner">
      <SearchBar />
      <ProductItem />
    </main>
  );
};

export default ProductList;
