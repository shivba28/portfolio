import { TextRotate } from "../components/Text-Animations/rotatingText";
import '../assets/CSS/skills.css';
import React, { useEffect, useRef } from "react";

export const Skills = () => {

    const words = ['React', 'Angular', 'Next.js', 'C#', 'Three.js']; // Replace with your words


    return(
        <section id='skill'>
            <div className="content skills">
                    <TextRotate words={words} />
            </div>
        </section>
    );
}