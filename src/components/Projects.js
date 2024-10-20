import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import front_img from '../assets/Images/project_front.png';
import '../assets/CSS/projects.css';
import Lottie from 'lottie-react';
import constructionData from '../assets/Lottie/CCDP.json';
import school from '../assets/Lottie/school.json';
import { useRef, useEffect } from "react";


export const Project = () => {

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.project',
                start: 'top top',
                end: "+=150%",
                pin: true,
                scrub: true,
            }
        })
        .to(".spacer", {
            scrollTrigger: {
              trigger: ".spacer",
              start: "top center", // This will trigger 100px before #project enters the viewport
              onEnter: () => {
                // Refresh all ScrollTriggers when the scroll is 100px before #project
                ScrollTrigger.refresh();
              }
            }
          })
        .to(".image-container img", {
            scale: 3,
            z: 350,
            transformOrigin: "center center",
            ease: "power1.inOut"
          })
        .to(
            '.section.hero',
            {
                scale:1.1,
                transformOrigin: 'center center',
                ease: 'power1.inOut'
            },
        );
    });

      

    const schoolRef = useRef(null);

    useEffect(() => {
        if (schoolRef.current) {
            // Start the animation at 2 seconds
            schoolRef.current.goToAndStop(2 * 60, true);
            schoolRef.current.play();

            // Set a timeout to stop the animation at 6 seconds
            const timeout = setTimeout(() => {
                if (schoolRef.current) {
                    // Stop the animation at 6 seconds
                    schoolRef.current.goToAndStop(6 * 60, true);
                    schoolRef.current.stop(); // Stop the animation
                }
            }, ((6*60) - (2*60)) / 60 * 1000); // Convert frames to milliseconds

            // Clear the timeout on unmount
            return () => clearTimeout(timeout);
        }
    }, []);

    return(
        
        <section className="project" >
            <div className="spacer" style={{height: "10px"}}></div>
            {/* <div className="image-container">
                <img src={front_img}/>
            </div> */}

            <div className="project-content">
                {/* <section className="section hero"></section> */}
                <section className="section" id="project">
                    <div className="project-items">
                        <div className="project-item" id="project-1">
                            <div className="base"></div>
                            <Lottie animationData = {constructionData} loop = {true} autoplay = {true} style={{ height: 300, width: 300 }}  />
                            <div className="isometric-button">
                                DURATION PREDICTOR
                                <div className="isometric-button-bg"></div>
                            </div>
                        </div>
                        <div className="project-item" id="project-2">
                        <Lottie lottieRef={schoolRef} animationData = {school} loop = {true} autoplay = {true} style={{ height: 300, width: 300 }}  />
                            </div>  
                    </div>
                </section>
            </div>
        </section>
    )
}