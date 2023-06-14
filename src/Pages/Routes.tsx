import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import MyPage from './MyPage/MyPage';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default RoutesComponent;
