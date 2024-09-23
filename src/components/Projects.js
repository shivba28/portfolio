import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import bg_img from '../assets/Images/project_bg.png';
import '../assets/CSS/projects.css';

export const Project = () => {

    console.clear();

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.project',
                start: 'top',
                end: "+=150%",
                pin: true,
                scrub: true,
            }
        })
        .to(".image-container img", {
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

    return(
        <section className="project" id="project">
            <div className="image-container">
                <img src={bg_img}/>
            </div>

            <div className="project-content">
                <section className="section hero"></section>
                <section class="section"></section>
                <section class="section"></section>
            </div>
        </section>
    )
}