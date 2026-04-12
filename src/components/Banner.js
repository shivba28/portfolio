import React, { useEffect, useRef } from 'react';
import video from "../assets/videos/intro.mp4";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

        mm.add("(max-width: 425px)", () => {
            gsap.set(containerRef.current, { top: "0px"});
            gsap.to(containerRef.current, {
                top: "-150px",
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

        mm.add("(max-width: 767px)", () => {
            gsap.set(videoRef.current, { height: "20vh"});
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

          mm.add("(767px < width <= 992px)", () => {
            gsap.set(videoRef.current, { height: "40vh", y: "-300px"});
            gsap.to(videoRef.current, {
              height: "20vh",
              y: "-200px",
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

          mm.add("(max-width: 992px)", () => {
            gsap.set(".collage-left", {left:"-50px"});
            gsap.set(".collage-right", {right:"-50px"});
          });

          mm.add("(992px < width <= 1200px)", () => {
            gsap.set(".collage-left", {left:"30px"});
            gsap.set(".collage-right", {right:"30px"});
          });

          mm.add("(1200px < width <= 1500px)", () => {
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

    return(
        <section className="home" id='home'>
            <div className="banner">
                <svg className="hero-doodles" style={{position:'absolute',top:0,left:0,right:0,bottom:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,overflow:'visible'}} viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
                  <path d="M 580 320 Q 650 330 720 318 Q 790 306 860 320 Q 930 334 1000 318" stroke="#F5C842" strokeWidth="4" fill="none" strokeLinecap="round" className="hero-underline"/>
                  <text x="60" y="80" fontSize="20" opacity="0.12" fill="#111">✦</text>
                  <text x="1100" y="60" fontSize="14" opacity="0.1" fill="#111">✦</text>
                  <text x="1050" y="200" fontSize="24" opacity="0.08" fill="#111">✦</text>
                  <text x="20" y="300" fontSize="12" opacity="0.1" fill="#111">✦</text>
                  <path d="M 1140 20 L 1180 20 L 1180 60" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.12"/>
                  <path d="M 20 360 L 20 380 L 60 380" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.12"/>
                </svg>
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
        </section>
    )
}