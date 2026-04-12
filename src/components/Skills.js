import '../assets/CSS/skills.css';
import { ListGroup } from 'react-bootstrap';
import { Stars } from './Bg-Animations/Stars';
import { Clouds } from './Bg-Animations/Clouds';
import progImg from '../assets/Images/lang.png';
import frameImg from '../assets/Images/framework.png';
import techImg from '../assets/Images/tech.png';
import testImg from '../assets/Images/test.png';
// import { SkillsScroll } from './SkillsScroll';
import { Row, Col } from "react-bootstrap";
import gsap from "gsap";

export const Skills = () => {

    const mm = gsap.matchMedia();
    let dataAosDelay = 200;
    let dataAosAnimation = 'fade-left';
    mm.add("(width <= 767px)", () => {dataAosDelay = 0; dataAosAnimation = 'none';})

    return(
       <section className='skills content' id='skill'>
            <Row>
                {/* <Col xs={12} lg={6}>
                    <SkillsScroll />
                </Col> */}
                <Col xs={12} lg={12}>
                    <div style={{display:'flex',alignItems:'baseline',gap:'16px',padding:'40px 32px 20px',borderBottom:'1.5px solid #ccc'}}>
                        <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'72px',color:'#E0DFD8',lineHeight:1,userSelect:'none'}}>01</span>
                        <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'48px',color:'#111',lineHeight:1}}>
                            My{' '}
                            <span style={{fontFamily:"'Caveat',cursive",fontSize:'52px',fontWeight:700,background:'#3BCEAC',padding:'0 6px'}}>
                                <span style={{position:'relative',display:'inline-block'}}>
                                    Skills
                                    <svg className="draw-on-scroll" style={{position:'absolute',bottom:'-6px',left:0,width:'100%',overflow:'visible',pointerEvents:'none'}} viewBox="0 0 200 12">
                                        <path d="M 0 8 Q 50 2 100 8 Q 150 14 200 8" stroke="#F5C842" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                                    </svg>
                                </span>
                            </span>
                        </h2>
                    </div>
                    <div className="card-container my-5">
                        <div className="skill-card" id='card1' data-aos={dataAosAnimation} data-aos-once="false">
                            <div className="background">
                                <Clouds />
                                <Stars />
                            </div>
                            <div className='content'>
                                    <img alt='languages' src={progImg} loading='lazy' />
                                    <h4>Languages</h4>
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
                        <div className="skill-card" id='card2' data-aos={dataAosAnimation} data-aos-once="false" data-aos-delay={`${dataAosDelay * 1}`}>
                            <div className="background">
                                <Clouds />
                                <Stars />
                            </div>
                            <div className='content'>
                                    <img alt='tech' src={techImg} loading='lazy' />
                                    <h4>Technologies</h4>
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
                        <div className="skill-card" id='card3' data-aos={dataAosAnimation} data-aos-once="false" data-aos-delay={`${dataAosDelay * 2}`}>
                            <div className="background">
                                <Clouds />
                                <Stars />
                            </div>
                            <div className='content'>
                                    <img alt='languages' src={frameImg} loading='lazy' />
                                    <h4>Frameworks</h4>
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
                        <div className="skill-card" id='card4' data-aos={dataAosAnimation} data-aos-once="false" data-aos-delay={`${dataAosDelay * 3}`}>
                            <div className="background">
                                <Clouds />
                                <Stars />
                            </div>
                            <div className='content'>
                                    <img alt='languages' src={testImg} loading='lazy' />
                                    <h4>Testing Tools and Concepts</h4>
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
                </Col>
            </Row>
    </section>
    )
}