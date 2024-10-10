import '../assets/CSS/skills.css';
import { Stars } from './Bg-Animations/Stars';
import { Clouds } from './Bg-Animations/Clouds';

export const Skills = () => {
    return(
       <section className='skills'>
            <div className="card-container">
                <div className="skill-card" id='card1'>
                    <div className="background">
                        <Clouds />
                        <Stars />
                    </div>
                </div>
                <div className="skill-card" id='card2'>
                    <div className="background">
                        <Clouds />
                        <Stars />
                    </div>
                </div>
                <div className="skill-card" id='card3'>
                    <div className="background">
                        <Clouds />
                        <Stars />
                    </div>
                </div>
                <div className="skill-card" id='card4'>
                    <div className="background">
                        <Clouds />
                        <Stars />
                    </div>
                </div>
            </div>
    </section>
    )
}