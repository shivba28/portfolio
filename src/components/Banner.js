import React, { useState, useEffect, useRef } from 'react';
import video from "../assets/videos/intro.mp4";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TextScramble } from '../components/Text-Animations/scrambleText';

import leftImg1 from "../assets/Images/banner_images/img1.HEIC";
import leftImg2 from "../assets/Images/banner_images/img2.HEIC";
import leftImg3 from "../assets/Images/banner_images/img3.JPG";
import rightImg1 from "../assets/Images/banner_images/img4.JPG";
import rightImg2 from "../assets/Images/banner_images/img5.JPG";
import rightImg3 from "../assets/Images/banner_images/img6.JPG";

export const Banner = () => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.set(videoRef.current, {height:"60vh"});
        const mm = gsap.matchMedia();
         // Pin the video container when scrolling and scale video
        gsap.timeline({
            scrollTrigger: {
                trigger: '.banner', // Element that triggers the animation
                start: 'top top', // Start when the top of .banner hits the top of the viewport
                end: '+=500%', // Keep it pinned until we scroll further down
                scrub: true, // Smooth scrolling effect
                pin: containerRef.current, // Pin the video container
                anticipatePin: 1, // Prevent snapping when pinning/unpinning
                invalidateOnRefresh: true // Recalculate on refresh or resize
            }
        })
        .to(videoRef.current, {
            scale: 2.6,
            transformOrigin: "center center",
            ease: "power1.inOut",
            height:"45vh",
            scrollTrigger: {
                trigger: '.banner', // Video animation is linked to .banner
                start: 'top top',
                end: 'bottom top', // Animation ends when the bottom of .banner reaches the top
                scrub: true,
                invalidateOnRefresh: true // Recalculate on refresh or resize
            }
        })
        .to(videoRef.current, {
            scrollTrigger: {
                trigger: containerRef.current, // Video animation is linked to .banner
                start: 'top top',
                end: '+=100%',
                pin: true, // This keeps the video pinned
                pinSpacing: false,
                invalidateOnRefresh: true // Recalculate on refresh or resize
            }
        })
        .to(".collage-left",{
            left: -400,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: '.banner', // Element that triggers the animation
                start: 'top top', // Start when the top of .banner hits the top of the viewport
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true // Recalculate on refresh or resize
            }
        })
        .to(".collage-right",{
            right: -400,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: '.banner', // Element that triggers the animation
                start: 'top top', // Start when the top of .banner hits the top of the viewport
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true // Recalculate on refresh or resize
            }
        })

        mm.add("(max-width: 767px)", () => {
            gsap.set(videoRef.current, { height: "20vh" });
            gsap.to(videoRef.current, {
              height: "10vh",
              borderRadius: 0,
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: '.banner', // Video animation is linked to .banner
                start: 'top top',
                end: 'bottom top', // Animation ends when the bottom of .banner reaches the top
                scrub: true,
                invalidateOnRefresh: true // Recalculate on refresh or resize
            },
            });
          });

          mm.add("(max-width: 900px)", () => {
            gsap.set(".collage-left", {left:-50});
            gsap.set(".collage-right", {right:-50});
          });

          mm.add("(max-width: 1200px)", () => {
            gsap.set(".collage-left", {left:30});
            gsap.set(".collage-right", {right:30});
          });

          mm.add("(max-width: 1500px)", () => {
            gsap.set(".collage-left", {left:50});
            gsap.set(".collage-right", {right:50});
          });
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
            <div className='photo collage-left d-flex flex-column'>
                <img id='left-img-1' src={leftImg1} style={{backgroundColor: "white"}}/>
                <img id='left-img-2' src={leftImg2} style={{backgroundColor: "white"}}/>
                <img id='left-img-3' src={leftImg3} style={{backgroundColor: "white"}}/>
            </div>
            <div className='photo collage-right d-flex flex-column'>
                <img id='right-img-1' src={rightImg1} style={{backgroundColor: "white"}}/>
                <img id='right-img-2' src={rightImg2} style={{backgroundColor: "white"}}/>
                <img id='right-img-3' src={rightImg3} style={{backgroundColor: "white"}}/>
            </div>
            <div ref={containerRef} className="video-container">
                <video ref={videoRef} loop muted playsInline className='video'>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className='content'></div>
            <div className="tagline-section">
                <TextScramble phrases={phrases} />
            </div>
        </section>
    )
}