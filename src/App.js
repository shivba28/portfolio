import './App.css';
import 'aos/dist/aos.css';
import React, { useEffect, useState, useRef } from 'react';
import { NavBar } from './components/Navbar';
import { Banner } from './components/Banner';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Project } from './components/Projects';
import { Contact } from './components/Contact';
import { LoadingScreen } from './components/LoadingScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
// import bgAudio from "./assets/Audios/binb.mp3";
// import gifImage from "./assets/Images/soundOn.gif";
import gsap from "gsap";
import AOS from 'aos';




function App() {

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [showGif, setShowGif] = useState(false);
  // const [audioEnabled, setAudioEnabled] = useState(true);

  // const gifRef = useRef(null);
  // const bgAudioRef = useRef(new Audio(bgAudio));

  const handleShow = () => {setShow(true);};

  const handleClose = () => {setShow(false);};

  const config = {};

  // const playBgMusic = () => {
  //   bgAudioRef.current.volume = 0.3;
  //   bgAudioRef.current.loop = true;
  //   bgAudioRef.current.play().catch(error => console.error("Autoplay blocked:", error));
  // }

  // useEffect(() => {
  //   bgAudioRef.current.volume = audioEnabled ? 0.3 : 0;
  // }, [audioEnabled]);

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

  // useEffect(() => {
  //   if (!loading) {
  //     setShowGif(true);
  //     playBgMusic(); // 🔥 Start music when GIF appears

  //     setTimeout(() => {
  //       gsap.to(gifRef.current, { opacity: 1, duration: 1 }); // Fade in the text after 1 second
  //     }, 500);

  //     setTimeout(() => {
  //       gsap.to(gifRef.current, { opacity: 0, duration: 1 }); // Start fade out after 4 sec
  //     }, 4000);

  //     setTimeout(() => {
  //       setShowGif(false);
  //     }, 5000);
  //   }
  // }, [loading]);

  useEffect(() => {
    AOS.init({offset: (window.innerHeight * .3)});
    AOS.refreshHard();
  }, [])

  return (
    <div className='App'>
      {
        loading ? <LoadingScreen setLoading={setLoading} /> :
          <IPadCursorProvider config={config}>
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
