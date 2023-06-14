import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './Pages/Routes';
import Globalstyle from './Styles/Globalstyle';
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';

function App(): JSX.Element {
  return (
    <>
      <Globalstyle />
      <Router>
        <Header />
        <RoutesComponent />
        <Footer />
      </Router>
    </>
  );
}

export default App;
