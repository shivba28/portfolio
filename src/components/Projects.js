import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import front_img from '../assets/Images/project_front.png';
import '../assets/CSS/projects.css';
import Lottie from 'lottie-react';
import { Row, Col } from "react-bootstrap";

import constructionData from '../assets/Lottie/CCDP.json';
import school from '../assets/Lottie/trimmed_school.json';
import pacman from '../assets/videos/pacman.mp4';
import ans from '../assets/Lottie/ANS.json';
import valentines from '../assets/Lottie/Valentine.json';
import chatbot from '../assets/Lottie/Chatbot.json';

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
                        <Row className="my-5 vh-40">
                            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-1">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {constructionData} loop = {true} autoplay = {true}  />
                                    </div>
                                    <div className="isometric-button noselect">DURATION PREDICTOR</div>
                                </div>
                            </Col>
                            <Col xs={12}sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-2">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {school} loop = {true} autoplay = {true}  />
                                    </div>
                                    <div className="isometric-button noselect">School Website</div>
                                </div>
                            </Col>
                            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-3">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <video loop muted playsInline autoPlay>
                                            <source src={pacman} type="video/mp4"/>
                                            Your browser does not support the video tag.
                                        </video>
                                        <div className="video-base"></div>
                                    </div>
                                    <div className="isometric-button noselect">Pacman-3D</div>
                                </div>
                            </Col>
                        </Row> 
                        <Row className="my-5 vh-40">
                            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-4">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {ans} loop = {true} autoplay = {true}  />
                                    </div>
                                    <div className="isometric-button noselect">Adopt Not Shop</div>
                                </div>
                            </Col>
                            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-5">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {valentines} loop = {true} autoplay = {true}  />
                                    </div>
                                    <div className="isometric-button noselect">Valentine's Game</div>
                                </div>
                            </Col>
                            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-6">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {chatbot} loop = {true} autoplay = {true}  />
                                    </div>
                                    <div className="isometric-button noselect">Chat-Bot</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
        </section>
    )
}