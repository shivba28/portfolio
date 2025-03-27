import './App.css';
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
import bgAudio from "./assets/Audios/binb.mp3";
import gifImage from "./assets/Images/soundOn.gif";
import gsap from "gsap";




function App() {

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showGif, setShowGif] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const gifRef = useRef(null);
  const bgAudioRef = useRef(new Audio(bgAudio));

  const handleShow = () => {setShow(true);};

  const handleClose = () => {setShow(false);};

  const playBgMusic = () => {
    bgAudioRef.current.volume = 0.3;
    bgAudioRef.current.loop = true;
    bgAudioRef.current.play().catch(error => console.error("Autoplay blocked:", error));
  }

  useEffect(() => {
    bgAudioRef.current.volume = audioEnabled ? 0.3 : 0;
  }, [audioEnabled]);

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

  useEffect(() => {
    if (!loading) {
      setShowGif(true);
      playBgMusic(); // 🔥 Start music when GIF appears

      setTimeout(() => {
        gsap.to(gifRef.current, { opacity: 1, duration: 1 }); // Fade in the text after 1 second
      }, 500);

      setTimeout(() => {
        gsap.to(gifRef.current, { opacity: 0, duration: 1 }); // Start fade out after 4 sec
      }, 4000);

      setTimeout(() => {
        setShowGif(false);
      }, 5000);
    }
  }, [loading]);

  return (
    <div className='App'>
      {
        loading ? <LoadingScreen setLoading={setLoading} /> :
        <div>
          <label 
            className="volume" id='mainVolumeButton'
            style={{
              position: "fixed",
              top: "100px",
              right: "20px",
              cursor: "none",
              zIndex: 10002,
            }}
          >
            <input type="checkbox" checked={!audioEnabled} onChange={() => setAudioEnabled(!audioEnabled)}/>
            <svg viewBox="0 0 108 96">
                <path d="M7,28 L35,28 L35,28 L59,8 L59,88 L35,68 L7,68 C4.790861,68 3,66.209139 3,64 L3,32 C3,29.790861 4.790861,28 7,28 Z"></path>
                <path d="M79,62 C83,57.3333333 85,52.6666667 85,48 C85,43.3333333 83,38.6666667 79,34 L49,3"></path>
                <path d="M95,69 C101.666667,61.6666667 105,54.3333333 105,47 C105,39.6666667 101.666667,32.3333333 95,25 L75.5,6 L49,33"></path>
            </svg>
          </label>
          {
            showGif ? 
            <div ref={gifRef} className="gif-container position-fixed">
              <img src={gifImage} alt="Loading animation" />
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
      }
    </div>
  );
}

export default App;
