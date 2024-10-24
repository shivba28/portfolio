import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import front_img from '../assets/Images/project_front.png';
import '../assets/CSS/projects.css';
import Lottie from 'lottie-react';
import { Row, Col } from "react-bootstrap";
import { useEffect, useRef } from 'react';

import constructionData from '../assets/Lottie/CCDP.json';
import school from '../assets/Lottie/trimmed_school.json';
import pacman from '../assets/videos/pacman.mp4';
import ans from '../assets/Lottie/ANS.json';
import valentines from '../assets/Lottie/Valentine.json';
import chatbot from '../assets/Lottie/Chatbot.json';
import videoGame from '../assets/Lottie/video-game.json';
import miniProjects from '../assets/Lottie/Mini-projects.json';
import portfolio from '../assets/Lottie/Portfolio.json';
import propChain1 from '../assets/Lottie/PropChain-1.json';
import propChain2 from '../assets/Lottie/PropChain-2.json';

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

    const textRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                // Add the class when the text enters the viewport
                Array.from(textRef.current.children).forEach(child => {
                child.classList.add('neon-animate');
            });
              } else {
                // Remove the class when the text leaves the viewport (optional)
                Array.from(textRef.current.children).forEach(child => {
                    child.classList.remove('neon-animate');
                  });
              }
            },
            {
                rootMargin: '-100px 0px 0px 0px',
                threshold: 0, // Trigger when 50% of the text is in the viewport
            }
          );
      
          if (textRef.current) {
            observer.observe(textRef.current); // Observe the target element
          }
      
          // Cleanup the observer when the component is unmounted
          return () => {
            if (textRef.current) {
              observer.unobserve(textRef.current);
            }
          };
        }, []);


    return(
        
        <section className="project" >
            <div className="spacer" style={{height: "10px"}}></div>
            <div className="image-container">
                <img src={front_img}/>
            </div>

            <div className="project-content">
                <section className="section hero"></section>
                <section className="section" id="project">
                    <div className="neon justify-content-center m-5" aria-hidden="true" aria-label="my skills" ref={textRef}>
                        <span className='neon-animate'>M</span>
                        <span className='neon-animate'>y</span>
                        <span className='neon-animate'>P</span>
                        <span className='neon-animate'>r</span>
                        <span className='neon-animate'>o</span>
                        <span className='neon-animate'>j</span>
                        <span className='neon-animate'>e</span>
                        <span className='neon-animate'>c</span>
                        <span className='neon-animate'>t</span>
                        <span className='neon-animate'>s</span>
                    </div>
                    <div className="project-items">
                        <Row className="my-5 vh-40">
                            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-1">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {constructionData} loop = {true} autoplay = {true}  />
                                    </div>
                                    <div className="project-title noselect">CCDP</div>
                                </div>
                            </Col>
                            <Col xs={12}sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-2">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {school} loop = {true} autoplay = {true}  />
                                    </div>
                                    <div className="project-title noselect">School Websites</div>
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
                                    <div className="project-title noselect">Pacman-3D</div>
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
                                    <div className="project-title noselect">Adopt Not Shop</div>
                                </div>
                            </Col>
                            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-5">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {valentines} loop = {true} autoplay = {true}  />
                                    </div>
                                    <div className="project-title noselect">Valentine's Game</div>
                                </div>
                            </Col>
                            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-6">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {chatbot} loop = {true} autoplay = {true}  />
                                    </div>
                                    <div className="project-title noselect">Chat-Bot</div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="my-5 vh-40">
                            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-7">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {videoGame} loop = {true} autoplay = {true}  />
                                    </div>
                                    <div className="project-title noselect">Video-Game Rental</div>
                                </div>
                            </Col>
                            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-8">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {miniProjects} loop = {true} autoplay = {true}  />
                                    </div>
                                    <div className="project-title noselect">Mini Projects</div>
                                </div>
                            </Col>
                            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-9">
                                    <div className="project-item-active"></div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {portfolio} loop = {true} autoplay = {true}  />
                                    </div>
                                    <div className="project-title noselect">Portfolio</div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="my-5 vh-40">
                            <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
                                <div className="project-item" id="project-10">
                                    <div className="project-item-active">
                                        <a style={{height:"100%", width:"100%", position:"absolute"}} href="https://github.com/shivba28/PropChain" target="_blank"></a>
                                    </div>
                                    <div className="base"></div>
                                    <div className="lottie-figure">
                                        <Lottie animationData = {propChain1} loop = {true} autoplay = {true}  />
                                        <Lottie className="part-2" animationData = {propChain2} loop = {true} autoplay = {true} style={{height:75, width:75 }} />
                                    </div>
                                    <div className="project-title noselect">Prop-Chain</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
        </section>
    )
}