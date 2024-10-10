import '../assets/CSS/skills.css';
import { ListGroup } from 'react-bootstrap';
import { Stars } from './Bg-Animations/Stars';
import { Clouds } from './Bg-Animations/Clouds';
import progImg from '../assets/Images/lang.png';
import frameImg from '../assets/Images/framework.png';
import techImg from '../assets/Images/tech.png';
import testImg from '../assets/Images/test.png';

export const Skills = () => {
    return(
       <section className='skills content' id='skill'>
        <div>
        <div className="neon" aria-hidden="true" aria-label="my skills">
                        <span>M</span>
                        <span>y</span>
                        <span>S</span>
                        <span>k</span>
                        <span>i</span>
                        <span>l</span>
                        <span>l</span>
                        <span>s</span>
                    </div>
        </div>
            <div className="card-container">
                <div className="skill-card" id='card1'>
                    <div className="background">
                        <Clouds />
                        <Stars />
                    </div>
                    <div className='content'>
                            <img alt='languages' src={progImg} loading='lazy' />
                            <h4 className='p-3'>Languages</h4>
                            <div className='card-content'>
                                    <ListGroup>
                                        <ListGroup.Item data-cursor="block">Python</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">C#</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Javascript/Typescript</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">HTML/CSS</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">PHP</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">SQL</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Ruby</ListGroup.Item>
                                    </ListGroup>
                                </div>
                    </div>
                </div>
                <div className="skill-card" id='card2'>
                    <div className="background">
                        <Clouds />
                        <Stars />
                    </div>
                    <div className='content'>
                            <img alt='tech' src={techImg} loading='lazy' />
                            <h4 className='p-3'>Technologies</h4>
                            <div className='card-content'>
                                    <ListGroup>
                                        <ListGroup.Item data-cursor="block">Docker</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Kubernetes</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">SSIS</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">JIRA</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">AWS</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Jenkins</ListGroup.Item>
                                    </ListGroup>
                                </div>
                    </div>
                </div>
                <div className="skill-card" id='card3'>
                    <div className="background">
                        <Clouds />
                        <Stars />
                    </div>
                    <div className='content'>
                            <img alt='languages' src={frameImg} loading='lazy' />
                            <h4 className='p-3'>Frameworks</h4>
                            <div className='card-content'>
                                    <ListGroup>
                                    <ListGroup.Item data-cursor="block">ASP.NET</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">VB.NET</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Flask/Django</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Next.js</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">GraphQL</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">React.js</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Angular</ListGroup.Item>
                                    </ListGroup>
                                </div>
                    </div>
                </div>
                <div className="skill-card" id='card4'>
                    <div className="background">
                        <Clouds />
                        <Stars />
                    </div>
                    <div className='content'>
                            <img alt='languages' src={testImg} loading='lazy' />
                            <h4 className='p-3'>Testing Tools and Concepts</h4>
                            <div className='card-content'>
                                    <ListGroup>
                                        <ListGroup.Item data-cursor="block">Selenium</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Cypress</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Test Driven Dev</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">OOP Concepts</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Machine Learning</ListGroup.Item>
                                    </ListGroup>
                                </div>
                    </div>
                </div>
            </div>
    </section>
    )
}