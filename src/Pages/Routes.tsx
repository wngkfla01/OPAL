import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default RoutesComponent;
