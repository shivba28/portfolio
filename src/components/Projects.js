import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import front_img from '../assets/Images/project_front.png';
import '../assets/CSS/projects.css';
import Lottie from 'lottie-react';
import constructionData from '../assets/Lottie/CCDP.json';
import school from '../assets/Lottie/trimmed_school.json';
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
                            <div className="lottie-figure">
                                <Lottie animationData = {constructionData} loop = {true} autoplay = {true}  />
                            </div>
                            <div className="isometric-button">
                                DURATION PREDICTOR
                                <div className="isometric-button-bg"></div>
                            </div>
                        </div>
                        {/* <div className="project-item" id="project-2">
                            <div className="base"></div>
                            <div className="lottie-position">
                                <Lottie animationData = {school} loop = {true} autoplay = {true} style={{ height: 225, width: 225 }}  />
                            </div>
                            <div className="isometric-button">
                                School Website
                                <div className="isometric-button-bg"></div>
                            </div>
                        </div>   */}
                    </div>
                </section>
            </div>
        </section>
    )
}