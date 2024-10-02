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
                                        <ListGroup.Item data-cursor="block">Python</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">C#</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Javascript/Typescript</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">HTML/CSS</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">PHP</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">SQL</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Ruby</ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-2">
                                <div className="image">
                                <a href="https://www.flaticon.com/free-icons/framework" title="framework icons" target="_blank">
                                    <img src={frameImg}></img>
                                </a>
                                    &nbsp;
                                    <h3>Framework</h3>
                                </div>
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
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-3">
                                <div className="image">
                                <a href="https://www.flaticon.com/free-icons/technology" title="technology icons" target="_blank">
                                    <img src={techImg}></img>
                                </a>&nbsp;
                                    <h3>Technologies</h3>
                                </div>
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
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-4">
                                <div className="image">
                                <a href="https://www.flaticon.com/free-icons/test" title="test icons" target="_blank">
                                    <img src={testImg}></img>
                                </a>&nbsp;
                                    <h3>Testing Tools & Concepts</h3>
                                </div>
                                <div className='card-content'>
                                <ListGroup>
                                        <ListGroup.Item data-cursor="block">Selenium</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Cypress</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Test Driven Dev</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">OOP Concepts</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Machine Learning</ListGroup.Item>
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