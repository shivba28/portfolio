import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import front_img from '../assets/Images/project_front.png';
import '../assets/CSS/projects.css';
import Lottie from 'lottie-react';
import constructionData from '../assets/Lottie/construction1.json';


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

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: constructionData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return(
        
        <section className="project" >
            <div className="spacer" style={{height: "10px"}}></div>
            {/* <div className="image-container">
                <img src={front_img}/>
            </div> */}

            <div className="project-content">
                {/* <section className="section hero"></section> */}
                <section className="section" id="project">
                    <div className="project-items project-1">
                        <div className="base"></div>
                        <Lottie animationData = {constructionData} loop = {true} autoplay = {true} style={{ height: 300, width: 300 }}  />
                        <div className="isometric-button">
                            DURATION PREDICTOR
                        <div className="isometric-button-bg"></div>
                        </div>
                        
                    </div>
                </section>
            </div>
        </section>
    )
}