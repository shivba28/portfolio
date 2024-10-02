import './App.css';
import React, { useEffect, useState } from 'react';
import { NavBar } from './components/Navbar';
import { Banner } from './components/Banner';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Project } from './components/Projects';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";


function App() {

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useIPadCursor();



  return (
    <div className="App">
      <IPadCursorProvider>   
        <NavBar openModal={handleShow} />
        <About show={show} handleClose={handleClose} />
        <Banner />
        <Skills />
        <Project />
      </IPadCursorProvider>
    </div>
  );
}

export default App;
