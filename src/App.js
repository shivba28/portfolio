import './App.css';
import React, { useEffect, useState } from 'react';
import { NavBar } from './components/Navbar';
import { Banner } from './components/Banner';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Project } from './components/Projects';
import { Contact } from './components/Contact';
import { LoadingScreen } from './components/LoadingScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";


function App() {

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useIPadCursor();



  useEffect(() => {
    const originalTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        document.title = originalTitle;
      } else {
        document.title = "Chotto matte Onee-san!";
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className='App'>
      {
        loading ? 
        <div>
          <LoadingScreen setLoading={setLoading} />
        </div>
         :
        <IPadCursorProvider>
          <NavBar openModal={handleShow} />
          <About show={show} handleClose={handleClose} />
          <Banner />
          <Skills />
          <Project />
          <Contact />
        </IPadCursorProvider>
      }
    </div>
  );
}

export default App;
