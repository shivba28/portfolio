import React, { useState, useEffect, useRef } from 'react';
import video from "../assets/videos/intro.mp4";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
//import { ConsoleText } from '../components/Text-Animations/consoleText'
import { TextScramble } from '../components/Text-Animations/scrambleText';

export const Banner = () => {
    
    

    const videoRef = useRef(null);


    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.banner',
                start: 'top center',
                end: "+=10%",
                scrub: true,
                pin: true
            }
        })
        gsap.to(".video-container video", {
            scale: 2.6,
            transformOrigin: "top center",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: '.banner',
                start: 'top',
                end: 'bottom',
                scrub: true,
            },
          },
        )
    })

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
{/* style={{ height: `${divHeight}px`, width: `${divWidth}px`}} */}
            <div className={`video-container`} >
                <video ref={videoRef} loop muted playsInline className='video'>
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
        </section>
    )
}