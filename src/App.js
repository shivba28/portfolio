import './App.css';
import React, { useState } from 'react';
import { NavBar } from './components/Navbar';
import { Banner } from './components/Banner';
import { About } from './components/About';
import { Cursor } from './components/Cursor';
import { Skills } from './components/Skills';
import { Project } from './components/Projects';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="App">
      <NavBar openModal={handleShow} />
      <About show={show} handleClose={handleClose} />
      <Banner />
      <Skills />
      <Project />
      <Cursor />
    </div>
  );
}

export default App;
