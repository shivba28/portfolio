import { TextRotate } from "../components/Text-Animations/rotatingText";
import { Card, CardLink, Col, ListGroup, Row } from "react-bootstrap";
import '../assets/CSS/skills.css';
import progImg from '../assets/Images/lang.png';
import frameImg from '../assets/Images/framework.png';
import techImg from '../assets/Images/tech.png';
import testImg from '../assets/Images/test.png';

export const Skills = () => {

    const words = ['React', 'Angular', 'Next.js', 'C#', 'Three.js']; // Replace with your words


    return(
        <section id='skill'>
            <div className="content skills">
                <Row style={{marginBottom: '12%', maxHeight:'15%'}}>
                    <Col  className="col">
                        <div className="tagline">
                            <TextRotate words={words} />
                        </div>
                    </Col>
                </Row>
                <div className="card-container">
                    <Row style={{flexWrap: 'wrap'}}>
                        <Col>
                            <Card id="card-1">
                                <div className="image">
                                <a href="https://www.flaticon.com/free-icons/programming-language" title="programming language icons" target="_blank">
                                    <img src={progImg}></img>
                                </a>&nbsp;
                                    <h3>Languages</h3>
                                </div>
                                <div className='card-content'>
                                    <ListGroup>
                                        <ListGroup.Item>Python</ListGroup.Item>
                                        <ListGroup.Item>C#</ListGroup.Item>
                                        <ListGroup.Item>Javascript/Typescript</ListGroup.Item>
                                        <ListGroup.Item>HTML/CSS</ListGroup.Item>
                                        <ListGroup.Item>PHP</ListGroup.Item>
                                        <ListGroup.Item>SQL</ListGroup.Item>
                                        <ListGroup.Item>Ruby</ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-2">
                                <div className="image">
                                <a href="https://www.flaticon.com/free-icons/framework" title="framework icons" target="_blank"><img src={frameImg}></img></a>
                                    &nbsp;
                                    <h3>Framework</h3>
                                </div>
                                <div className='card-content'>
                                <ListGroup>
                                        <ListGroup.Item>ASP.NET</ListGroup.Item>
                                        <ListGroup.Item>VB.NET</ListGroup.Item>
                                        <ListGroup.Item>Flask/Django</ListGroup.Item>
                                        <ListGroup.Item>Next.js</ListGroup.Item>
                                        <ListGroup.Item>GraphQL</ListGroup.Item>
                                        <ListGroup.Item>React.js</ListGroup.Item>
                                        <ListGroup.Item>Angular</ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-3">
                                <div className="image">
                                <a href="https://www.flaticon.com/free-icons/technology" title="technology icons" target="_blank"><img src={techImg}></img></a>&nbsp;
                                    <h3>Technologies</h3>
                                </div>
                                <div className='card-content'>
                                <ListGroup>
                                        <ListGroup.Item>Docker</ListGroup.Item>
                                        <ListGroup.Item>Kubernetes</ListGroup.Item>
                                        <ListGroup.Item>SSIS</ListGroup.Item>
                                        <ListGroup.Item>JIRA</ListGroup.Item>
                                        <ListGroup.Item>AWS</ListGroup.Item>
                                        <ListGroup.Item>Jenkins</ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-4">
                                <div className="image">
                                <a href="https://www.flaticon.com/free-icons/test" title="test icons" target="_blank"><img src={testImg}></img></a>&nbsp;
                                    <h3>Testing Tools & Concepts</h3>
                                </div>
                                <div className='card-content'>
                                <ListGroup>
                                        <ListGroup.Item>Selenium</ListGroup.Item>
                                        <ListGroup.Item>Cypress</ListGroup.Item>
                                        <ListGroup.Item>Test Driven Dev</ListGroup.Item>
                                        <ListGroup.Item>OOP Concepts</ListGroup.Item>
                                        <ListGroup.Item>Machine Learning</ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div> 
        </section>
    );
}