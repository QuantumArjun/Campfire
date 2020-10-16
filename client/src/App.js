import React from 'react';

import Lobby from './components/Lobby/Lobby';
import Join from './components/Join/Join';
import Setup from './components/Setup/Setup';
// import About from './components/About/About';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/lobby" component={Lobby} />
      <Route path="/setup" component={Setup} />
      {/* <Route path="/about" component={About} /> */}
    </Router>
  );
} 

export default App;
