import React, { useState, useEffect, useRef } from 'react';
import video from "../assets/videos/intro.mp4";
//import { ConsoleText } from '../components/Text-Animations/consoleText'
import { TextScramble } from '../components/Text-Animations/scrambleText';

export const Banner = () => {
    

    const [divHeight, setDivHeight] = useState((() => {if(window.innerWidth < 873){return 225;} else{return 340;}}));
    const [divWidth, setDivWidth] = useState((() => {if(window.innerWidth < 873){return 300;} else{return 800;}}));

    

    const videoRef = useRef(null);


  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const winHeight = window.innerHeight;
    const winWidth = window.innerWidth;
    const docHeight = document.body.scrollHeight - winHeight;
    const scrollFraction = (scrollTop) / (docHeight * 0.4) ;

        
    

    if(winWidth < 873) {
        setDivHeight(225);
        setDivWidth(300 + scrollFraction * winWidth)
        const newWidth = 300 + scrollFraction * winWidth;
        setDivWidth(Math.min(newWidth,winWidth + 30));
    } else{
        setDivHeight(340);
        setDivWidth(800 + scrollFraction * winWidth);
        const newWidth = 800 + scrollFraction * winWidth;
        setDivWidth(Math.min(newWidth,winWidth));
    }

    const videoDiv = document.querySelector('.video-container');
    const aboutSection = document.querySelector('.about-section');

    if (scrollTop > winHeight/2) {
        videoDiv.classList.add('sticky');
        aboutSection.classList.add('show');
      } else {
        videoDiv.classList.remove('sticky');
        aboutSection.classList.remove('show');
      }

  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on page load
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    const delay = 2500;

    const timeoutId = setTimeout(() => {
        videoElement.play();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);

  const phrases = [
    'What do tigers dream of when they take their little tiger snooze?',
    "Do they dream of mauling zebras?",
    'Or Halle Berry in her' + " 'Catwoman' " + 'suit?',
  ];

    return(
        <section className="home" id='home'>
            <div className="banner">
                <div className="slogan-left"><h1 className="left">THIS IS</h1></div>
                <div className="slogan-right"><h1 className="right">my story</h1></div>
            </div>

            {/* 
            <iframe
                width={560} height={316} 
                src="https://www.youtube.com/embed/fMnOaD0e6UY?si=rg0vXAbgpUjpwiXm" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay=1&mute=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
            )} */}

            <div className={`video-container`} style={{ height: `${divHeight}px`, width: `${divWidth}px`}}>
                <video
                    ref={videoRef} 
                    loop 
                    muted 
                    playsInline
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
                
            <div className="about-section" style={{marginBottom: '15vh', marginTop: '35vh'}}>
            
            <TextScramble phrases={phrases} />
                
                {/* <ConsoleText 
                    words={['HAVE I PLAYED THE PART WELL?', 'THEN APPLAUD, AS I EXIT.' ]} 
                    colors={['black']} 
                /> */}
            </div>
            <div className='content'>
            </div>
        </section>
    )
}