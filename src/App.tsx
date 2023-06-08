import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './Pages/Routes';
import Globalstyle from './Styles/Globalstyle';

function App(): JSX.Element {
  return (
    <>
      <Globalstyle />
      <Router>
        <RoutesComponent />
      </Router>
    </>
  );
}

export default App;
