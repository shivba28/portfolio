import { TextRotate } from "../components/Text-Animations/rotatingText";

export const Skills = () => {

    const words = ['React', 'Angular', 'Next.js', 'C#', 'Three.js']; // Replace with your words

    return(
        <div className="content skills" id="skill">
                 <TextRotate words={words} />
        </div>
    );
}