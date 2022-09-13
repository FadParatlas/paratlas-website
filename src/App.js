import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from
  'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Demo from './components/pages/Demo';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <AnimatePresence>
          <Routes>
            <Route path='/' element=
              {<Home />} />
            <Route path='/Demo' element=
              {<Demo />} />
          </Routes>
        </AnimatePresence>
      </Router>

    </div>
  );
}

export default App;
