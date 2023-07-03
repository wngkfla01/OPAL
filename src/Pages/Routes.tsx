import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import MyPage from './MyPage/MyPage';
import ProductList from './ProductList/ProductList';
import ProductDetail from './ProductDetail/ProductDetail';
import ProductPayment from './ProductPayment/ProductPayment';
import NotFound from '../Components/Common/NotFound';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/productdetail/:id" element={<ProductDetail />} />
      <Route path="/productpayment" element={<ProductPayment />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
