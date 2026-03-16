import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import front_img from '../assets/Images/project_front.png';
import '../assets/CSS/projects.css';
import Lottie from 'lottie-react';
import { Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from 'react';
// import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Row, Col } from "react-bootstrap";
import { IPadCursorProvider } from 'ipad-cursor/react';

import constructionData from '../assets/Lottie/CCDP.json';
// import school from '../assets/Lottie/trimmed_school.json';
import pacman from '../assets/Lottie/pacman.gif';
import ans from '../assets/Lottie/ANS.json';
import valentines from '../assets/Lottie/Valentine.json';
import chatbot from '../assets/Lottie/Chatbot.json';
import videoGame from '../assets/Lottie/video-game.json';
import miniProjects from '../assets/Lottie/Mini-projects.json';
import portfolio from '../assets/Lottie/Portfolio.json';
import propChain1 from '../assets/Lottie/PropChain-1.json';
import propChain2 from '../assets/Lottie/PropChain-2.json';
import cardHeart from '../assets/Lottie/Card-Heart.json';
import foodservices from '../assets/Lottie/foodservices.json';
import rsvp from '../assets/Lottie/rsvp.json';
import secretSanta from '../assets/Lottie/secretSanta.json';
import umbracoBase from '../assets/Lottie/umbracoBase.json';
import voting from '../assets/Lottie/Voting.json';

// At the top of Projects.jsx, keep all your lottie/asset imports as-is, then add:
import projectsData from '../assets/json/projects.json';

const assetMap = {
  constructionData,
  ans,
  valentines,
  chatbot,
  portfolio,
  miniProjects,
  videoGame,
  propChain1,
  propChain2,
  pacman,
  foodservices,
  umbracoBase,
  voting,
  rsvp,
  secretSanta,
  cardHeart
};

// Resolve string keys in JSON to actual imported assets
const projects = projectsData.map((p) => ({
  ...p,
  ...(p.animationData  && { animationData:  assetMap[p.animationData]  }),
  ...(p.animationData2 && { animationData2: assetMap[p.animationData2] }),
  ...(p.video          && { video:          assetMap[p.video]          }),
}));



export const Project = () => {
    const imageRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const mm = gsap.matchMedia();

    let dataAosOffset = 1500;

    mm.add("(max-width: 767px)", () => {dataAosOffset = 0;})

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const md = gsap.matchMedia();
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
            scale: 4,
            z: 300,
            transformOrigin: "center center",
            ease: "power1.inOut"
          })

        md.add("(max-width: 400px)", () => {
            gsap.set(".scroll-wrapper img", { scale: 2 });
          });
    });
    
        // Open modal and set selected project
        const openModal = (project) => setSelectedProject(project);
    
        // Close modal by clearing the selected project
        const closeModal = () => setSelectedProject(null);

        // const CustomLeftArrow = ({ onClick, ...rest }) => {
        //     const {
        //       onMove,
        //       carouselState: { currentSlide, deviceType }
        //     } = rest;
        //     // onMove means if dragging or swiping in progress.
        //     return <IPadCursorProvider><button data-cursor="block" data-cursor-style="background: transparent;" className="custom-arrow arrow-left" onClick={() => onClick()}>◀</button></IPadCursorProvider>;
        //   };

        // const CustomRightArrow = ({ onClick, ...rest }) => {
        //     const {
        //       onMove,
        //       carouselState: { currentSlide, deviceType }
        //     } = rest;
        //     // onMove means if dragging or swiping in progress.
        //     return <button data-cursor="block" data-cursor-style="background: transparent;" className="custom-arrow arrow-right" onClick={() => onClick()}>▶</button>;
        //   };

        //   const responsive = {
        //     superLargeDesktop: {
        //       // the naming can be any, depends on you.
        //       breakpoint: { max: 4000, min: 3000 },
        //       items: 5
        //     },
        //     largeDesktop: {
        //       breakpoint: { max: 3000, min: 1500 },
        //       items: 4
        //     },
        //     laptop: {
        //         breakpoint: { max: 1500, min: 1024 },
        //         items: 3
        //     },
        //     tablet: {
        //       breakpoint: { max: 1024, min: 505 },
        //       items: 2
        //     },
        //     mobile: {
        //       breakpoint: { max: 505, min: 0 },
        //       items: 1
        //     }
        //   };

    return(
        <section className="project">
            <div className="scroll-wrapper">
                <div className="scroll-content">
                    <section className="section hero"></section>
                </div>
                <div className="image-container">
                    <img src={front_img} ref={imageRef}/>
                </div>
            </div>
            <section className="project-content section" id="project">
                <div className="title text-center pt-4 bg-gradient d-flex flex-wrap w-100 mb-4" id="project-title">
                    <div className="slogan-left ms-auto"><h1 className="left">MY</h1></div>
                    <div className="slogan-right me-auto"><h1 className="right">PROJECTS</h1></div>
                </div>
                <Row className="project-items my-3">
                    {projects.map((project, index) => (
                        <Col key={project.id} xs={12} md={6} xl={4} className="m-auto prj-col" data-aos="fade-left" data-aos-delay={200 * project.id} data-aos-anchor={"#project-"+(project.id - 1)} data-aos-offset="800">
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
                                                    <img src={project.video} alt={project.title} />
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
                {/* <Carousel responsive={responsive} infinite={true} draggable={false} customLeftArrow={<CustomLeftArrow />} customRightArrow={<CustomRightArrow />} 
                removeArrowOnDeviceType={["tablet", "mobile"]}
                >
                    {projects.map((project, index) => (
                        <div className="project-item my-5" id={"project-"+project.id} key={index}>
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
                                                <img src={project.video} alt="pacman" />
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
                    ))}
                </Carousel> */}

                {/* Modal to display project info dynamically */}
                {selectedProject && (
                    <Modal show onHide={closeModal} centered size="lg" className="projects-modal fade rounded">
                        <Modal.Header className="justify-content-center">
                            <Modal.Title className="text-center fs-1 rounded px-3">{selectedProject.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="rounded-bottom align-content-center">
                            <div className="project-modal-content row align-items-center">
                                <div className="info-section col d-grid">
                                    <p className="text-justify">{selectedProject.Desc}</p>
                                    <a data-cursor="block" data-cursor-style="background:transparent" className="btn btn-dark mt-4" href={selectedProject.link} target="_blank" style={{zIndex:100, position:"relative"}}>GITHUB</a>
                                    {selectedProject.demo && (<a data-cursor="block" data-cursor-style="background:transparent" className="btn btn-dark mt-4" href={selectedProject.demo} target="_blank" style={{zIndex:100, position:"relative"}}>LIVE</a>)}
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
                                                <div>
                                                    <img src={selectedProject.video} alt="pacman" />
                                                </div>
                                            );
                                        case "lottie-prop" :
                                            return (
                                                <div className="lottie-figure m-auto">
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
        </section>
    )
}