import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import front_img from '../assets/Images/project_front.png';
import '../assets/CSS/projects.css';
import Lottie from 'lottie-react';
import { Modal } from "react-bootstrap";
import { useRef, useState } from 'react';
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
import mealRoulette from '../assets/Lottie/mealRoulette.json';

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
  cardHeart,
  mealRoulette
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
    const rootRef = useRef(null);
    const cardsRootRef = useRef(null);
    const loadMoreBtnRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [visibleCount, setVisibleCount] = useState(6);
    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {});

    // Pinned hero animation (set up once)
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
    }, { scope: rootRef });

    // Project cards reveal on scroll (rebuild when list grows)
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const scopeEl = cardsRootRef.current;
        if (!scopeEl) return;

        const cards = Array.from(scopeEl.querySelectorAll(".prj-col"));
        gsap.set(cards, { autoAlpha: 0, x: 60 });

        ScrollTrigger.batch(cards, {
            start: "top 85%",
            onEnter: (batch) =>
                gsap.to(batch, {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.08,
                    overwrite: "auto",
                }),
            onLeaveBack: (batch) => gsap.set(batch, { autoAlpha: 0, x: 60 }),
        });
    }, { scope: cardsRootRef, dependencies: [visibleCount] });

        const sortedProjects = [...projects].sort((a, b) => {
            const aTime = a.createdDate ? new Date(a.createdDate).getTime() : 0;
            const bTime = b.createdDate ? new Date(b.createdDate).getTime() : 0;
            return bTime - aTime;
        });

        const visibleProjects = sortedProjects.slice(0, visibleCount);
    
        // Open modal and set selected project
        const openModal = (project) => setSelectedProject(project);
    
        // Close modal by clearing the selected project
        const closeModal = () => setSelectedProject(null);

        const handleLoadMore = () => {
            const y = window.scrollY;
            setVisibleCount((c) => Math.min(c + 3, sortedProjects.length));

            // Preserve scroll position while pinned ScrollTriggers refresh due to new content height.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    ScrollTrigger.refresh();
                    window.scrollTo({ top: y, left: 0, behavior: "instant" });
                    loadMoreBtnRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
                });
            });
        };

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
        <section className="project" ref={rootRef}>
            <div className="scroll-wrapper">
                <div className="scroll-content">
                    <section className="section hero"></section>
                </div>
                <div className="image-container">
                    <img src={front_img} ref={imageRef}/>
                </div>
            </div>
            <section className="project-content section" id="project" ref={cardsRootRef}>
                <div style={{display:'flex',alignItems:'baseline',gap:'16px',padding:'40px 32px 20px',borderBottom:'1.5px solid #ccc'}}>
                    <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'72px',color:'#E0DFD8',lineHeight:1,userSelect:'none'}}>02</span>
                    <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'48px',color:'#111',lineHeight:1}}>
                        My{' '}
                        <span style={{fontFamily:"'Caveat',cursive",fontSize:'52px',fontWeight:700,background:'#FF5E5E',padding:'0 6px',color:'#111'}}>
                            <span style={{position:'relative',display:'inline-block'}}>
                                Projects
                                <svg className="draw-on-scroll" style={{position:'absolute',bottom:'-6px',left:0,width:'100%',overflow:'visible',pointerEvents:'none'}} viewBox="0 0 200 12">
                                    <path d="M 0 8 Q 50 2 100 8 Q 150 14 200 8" stroke="#F5C842" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </span>
                    </h2>
                </div>
                <Row className="project-items my-3">
                    {visibleProjects.map((project) => (
                        <Col
                            key={project.id}
                            xs={12}
                            md={6}
                            xl={4}
                            className="m-auto prj-col"
                        >
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
                {visibleCount < sortedProjects.length && (
                    <div className="d-flex justify-content-center pb-5">
                        <button
                            type="button"
                            className="btn project-load-more"
                            onClick={handleLoadMore}
                            ref={loadMoreBtnRef}
                        >
                            Load more
                        </button>
                    </div>
                )}
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
                                    <p className="text-left">{selectedProject.Desc}</p>
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