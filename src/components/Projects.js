import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import front_img from '../assets/Images/project_front.png';
import '../assets/CSS/projects.css';
import Lottie from 'lottie-react';
import { Row, Col, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from 'react';

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
    const [selectedProject, setSelectedProject] = useState(null);
    const textRef = useRef(null);

    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.scroll-wrapper',
                start: 'top top',
                end: "+=150%",
                pin: true,
                scrub: true,
            }
        })
        .to(".scroll-wrapper img", {
            scale: 2,
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
                    // child.classList.remove('neon-animate');
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



        // Project data array (title, description, media) for simplicity
        const projects = [
            { id: 1, title: "CCDP", animationData: constructionData, type: "lottie", },
            { id: 2, title: "School Websites", animationData: school, type: "lottie" },
            { id: 3, title: "Pacman-3D", video: pacman, type: "video" },
            { id: 4, title: "Adopt Not Shop", animationData: ans, type: "lottie" },
            { id: 5, title: "Valentine's Game", animationData: valentines, type: "lottie" },
            { id: 6, title: "Chat-Bot", animationData: chatbot, type: "lottie" },
            { id: 7, title: "Video Game Rental", animationData: videoGame, type: "lottie" },
            { id: 8, title: "Mini-Projects", animationData: miniProjects, type: "lottie" },
            { id: 9, title: "Portfolio", animationData: portfolio, type: "lottie" },
            { id: 10, title: "Prop-Chain", animationData: propChain1, animationData2: propChain2, type: "lottie-prop" }
            // Add other projects as needed
        ];
    
        // Open modal and set selected project
        const openModal = (project) => setSelectedProject(project);
    
        // Close modal by clearing the selected project
        const closeModal = () => setSelectedProject(null);
    


    return(
        
        <section className="project" >
            {/* <div className="spacer" style={{height: "10px"}}></div> */}
            <div className="scroll-wrapper">
                <div className="scroll-content">
                    <section className="section hero"></section>
                </div>
                <div class="image-container">
                    <img src={front_img}/>
                </div>
            </div>
            <div className="project-content">
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
                    <Row className="project-items my-6">
                    {projects.map((project, index) => (
                        <Col key={project.id} xs={12} sm={6} lg={4} className="m-auto">
                            <div className="project-item my-5" id={"project-"+project.id}>
                                <div className="project-item-active">
                                <a style={{height:"100%", width:"100%", position:"absolute"}} onClick={() => openModal(project)}></a>
                                </div>
                                <div className="base"></div>
                                <div className="lottie-figure">
                                    {(() => {
                                        switch (project.type) {
                                            case 'lottie':
                                            return (
                                                <Lottie animationData={project.animationData} loop={true} autoplay={true} />
                                            );
                                            case "video" :
                                            return (
                                                <div>
                                                    <video loop muted playsInline autoPlay>
                                                        <source src={project.video} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                    <div className="video-base"></div>
                                                </div>
                                            );
                                            case "lottie-prop" :
                                                return (
                                                    <div>
                                                        <Lottie animationData={project.animationData} loop={true} autoplay={true} />
                                                        <Lottie className="part-2" animationData={project.animationData2} loop={true} autoplay={true} style={{height:75, width:75 }} />
                                                    </div>
                                                );
                                            default:
                                                return null; // Optional: handle unexpected types
                                                }
                                    })()}
                                </div>
                                <div className="project-title noselect">{project.title}</div>
                            </div>
                        </Col>
                    ))}
                </Row>

            {/* Modal to display project info dynamically */}
            {selectedProject && (
                <Modal show onHide={closeModal} centered size="lg" className="projects-modal fade rounded">
                    <Modal.Header className="bg-secondary justify-content-center">
                        <Modal.Title className="text-center fs-1">{selectedProject.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-black rounded-bottom">
                        <div className="project-modal-content row">
                            <div className="info-section col-6">
                                <p>Project details for {selectedProject.title}...</p>
                                <a className="navbar-link link btn" style={{zIndex:100, position:"relative"}}>Code</a>
                                <a className="navbar-link link btn" style={{zIndex:100, position:"relative"}}>Demo</a>
                            </div>
                            <div className="media-section col-6" id={"project-"+selectedProject.id}>
                            {(() => {
                                switch (selectedProject.type) {
                                    case "lottie":
                                        return (
                                            <div className="lottie-figure">
                                                <Lottie animationData={selectedProject.animationData} loop autoplay />
                                            </div>
                                        );
                                    case "video" :
                                        return (
                                        <video loop muted playsInline autoPlay> 
                                            <source src={selectedProject.video} type="video/mp4"/>
                                            Your browser does not support the video tag.
                                        </video>
                                        );
                                    case "lottie-prop" :
                                        return (
                                            <div>
                                            <Lottie animationData={selectedProject.animationData} loop={true} autoplay={true} />
                                            <Lottie className="part-2" animationData={selectedProject.animationData2} loop={true} autoplay={true} style={{height:75, width:75 }} />
                                        </div>
                                    );
                                    default:
                                        return null; // Optional: handle unexpected types
                                        }
                        })()}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
                </section>
            </div>
        </section>
    )
}