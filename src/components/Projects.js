import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import front_img from '../assets/Images/project_front.png';
import '../assets/CSS/projects.css';
import Lottie from 'lottie-react';
import { Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { IPadCursorProvider } from 'ipad-cursor/react';

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
            gsap.set(".scroll-wrapper img", { scale: 1.1 });
          });
    });


        // Project data array (title, description, media) for simplicity
        const projects = [
            { 
                id: 1, title: "CCDP", animationData: constructionData, type: "lottie",
                link:"https://github.com/shivba28/CCDP",
                Desc:"A robust construction project management tool designed to streamline documentation," + " " +
                "progress tracking, and collaborative workflows," + " " +
                "facilitating efficient project oversight from inception to completion."
            },
            { id: 2, title: "School Websites", animationData: school, type: "lottie",
                link:"https://github.com/shivba28/GardenCms",
                Desc:"Developed a comprehensive platform for school websites with responsive design and CMS integration," + " " + 
                "enabling schools to manage content and showcase information seamlessly for students, parents, and staff."
            },
            { id: 3, title: "Pacman-3D", video: pacman, type: "video",
                link:"https://github.com/shivba28/PacMan3D",
                Desc:"A 3D twist on the classic Pacman game, this project features enhanced graphics and interactive elements," + " " +
                "offering players an immersive experience with challenging mazes and power-ups."
            },
            { id: 4, title: "Adopt Not Shop", animationData: ans, type: "lottie",
                link:"https://github.com/shivba28/ANS",
                Desc:"An application promoting animal adoption by providing resources and profiles of pets," + " " + 
                "helping users find adoptable pets and raise awareness about shelter animals."
            },
            { id: 5, title: "Valentine's Game", animationData: valentines, type: "lottie", 
                link:"https://github.com/shivba28/v-game-app",
                demo:"https://shivba28.github.io/v-game-app/",
                Desc:"A lighthearted, interactive game celebrating Valentine's Day," + " " +
                "designed to engage users with festive mini-games and challenges centered around themes of love and friendship."
            },
            { id: 6, title: "Chat-Bot", animationData: chatbot, type: "lottie", 
                link:"https://github.com/shivba28/chat-bot", 
                Desc:"An AI-driven chatbot that facilitates seamless user interactions," + " " +
                "providing assistance and answers to frequently asked questions across various domains, with a focus on natural language processing."
            },
            { id: 7, title: "Portfolio", animationData: portfolio, type: "lottie", 
                link:"https://github.com/shivba28/portfolio_2.0", 
                Desc:"A personal portfolio showcasing development skills, projects," + " " +
                "and accomplishments in a visually appealing format, serving as an online resume and professional introduction."
            },
            { id: 8, title: "Mini Projects", animationData: miniProjects, type: "lottie", 
                link:"https://github.com/shivba28/Mini-Projects", 
                Desc:"A collection of innovative small-scale projects designed to explore new technologies," + " " + 
                "experiment with creative ideas, and develop unique, functional solutions to common challenges."
            },
            { id: 9, title: "Video Game Rental", animationData: videoGame, type: "lottie", 
                link:"https://github.com/shivba28/Game_Rentel", 
                Desc:"A platform for renting video games that allows users to browse," + " " +
                "select, and rent games easily, while managing inventory and tracking rental history effectively."
            },
            { id: 10, title: "Prop-Chain", animationData: propChain1, animationData2: propChain2, type: "lottie-prop", 
                link:"https://github.com/shivba28/PropChain",
                Desc:"A blockchain-inspired project aimed at enhancing property management by securely recording transactions," + " " + 
                "managing ownership records, and ensuring transparent real estate processes."
            }
            // Add other projects as needed
        ];
    
        // Open modal and set selected project
        const openModal = (project) => setSelectedProject(project);
    
        // Close modal by clearing the selected project
        const closeModal = () => setSelectedProject(null);

        const CustomLeftArrow = ({ onClick, ...rest }) => {
            const {
              onMove,
              carouselState: { currentSlide, deviceType }
            } = rest;
            // onMove means if dragging or swiping in progress.
            return <IPadCursorProvider><button data-cursor="block" data-cursor-style="background: transparent;" className="custom-arrow arrow-left" onClick={() => onClick()}>◀</button></IPadCursorProvider>;
          };

        const CustomRightArrow = ({ onClick, ...rest }) => {
            const {
              onMove,
              carouselState: { currentSlide, deviceType }
            } = rest;
            // onMove means if dragging or swiping in progress.
            return <button data-cursor="block" data-cursor-style="background: transparent;" className="custom-arrow arrow-right" onClick={() => onClick()}>▶</button>;
          };

          const responsive = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 5
            },
            largeDesktop: {
              breakpoint: { max: 3000, min: 1500 },
              items: 4
            },
            laptop: {
                breakpoint: { max: 1500, min: 1024 },
                items: 3
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1
            }
          };

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
            <section className="project-content section my-5 py-5" id="project" data-aos="slide-left" data-aos-offset={dataAosOffset} data-aos-duration="1500" data-aos-once="false">
                {/* <div className="title text-center pt-4 bg-gradient d-flex flex-wrap w-100 mb-4" data-aos="fade-down" data-aos-offset="500">
                    <div className="slogan-left ms-auto"><h1 className="left">MY</h1></div>
                    <div className="slogan-right me-auto"><h1 className="right">PROJECTS</h1></div>
                </div> */}
                <Carousel responsive={responsive} infinite={true} draggable={false} customLeftArrow={<CustomLeftArrow />} customRightArrow={<CustomRightArrow />} 
                removeArrowOnDeviceType={["tablet", "mobile"]}
                >
                    {projects.map((project, index) => (
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
                    ))}
                </Carousel>

                {/* Modal to display project info dynamically */}
                {selectedProject && (
                    <Modal show onHide={closeModal} centered size="lg" className="projects-modal fade rounded">
                        <Modal.Header className="bg-black justify-content-center">
                            <Modal.Title className="text-center fs-1 rounded px-3">{selectedProject.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="bg-black rounded-bottom">
                            <div className="project-modal-content row align-items-center">
                                <div className="info-section col d-grid">
                                    <p className="text-justify">{selectedProject.Desc}</p>
                                    <a data-cursor="block" data-cursor-style="background:transparent" className="btn btn-dark mt-4" href={selectedProject.link} target="_blank" style={{zIndex:100, position:"relative"}}>CODE</a>
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
                                                    <video loop muted playsInline autoPlay> 
                                                        <source src={selectedProject.video} type="video/mp4"/>
                                                        Your browser does not support the video tag.
                                                    </video>
                                                    <div className="video-base"></div>
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

{/* <Row className="project-items my-3">
    {projects.map((project, index) => (
        <Col key={project.id} xs={12} md={6} xl={4} className="m-auto prj-col">
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
</Row> */}