import { TextRotate } from "../components/Text-Animations/rotatingText";
import { Card, CardLink, Col, Row } from "react-bootstrap";
import '../assets/CSS/skills.css';
import progImg from '../assets/Images/programming.png'

export const Skills = () => {

    const words = ['React', 'Angular', 'Next.js', 'C#', 'Three.js']; // Replace with your words


    return(
        <section id='skill'>
            <div className="content skills">
                <Row style={{maxHeight: '35%'}}>
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
                                    <img src={progImg}></img>
                                </div>
                                <div className='card-content'>
                                    <h3>Languages</h3>
                                    <p>
                                        Din publishing and graphic design
                                        Din publishing and graphic design
                                        Din publishing and graphic design
                                        Din publishing and graphic design
                                    </p>
                                </div>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-2">
                                <div className="image">
                                    <img src=""></img>
                                </div>
                                <div className='card-content'>
                                    <h3>Framework</h3>
                                    <p>
                                        Din publishing and graphic design
                                        Din publishing and graphic design
                                        Din publishing and graphic design
                                        Din publishing and graphic design
                                    </p>
                                </div>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-3">
                                <div className="image">
                                    <img src=""></img>
                                </div>
                                <div className='card-content'>
                                    <h3>Technologies</h3>
                                    <p>
                                        Din publishing and graphic design
                                        Din publishing and graphic design
                                        Din publishing and graphic design
                                        Din publishing and graphic design
                                    </p>
                                </div>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-4">
                                <div className="image">
                                    <img src=""></img>
                                </div>
                                <div className='card-content'>
                                    <h3>Testing Tools</h3>
                                    <p>
                                        Din publishing and graphic design
                                        Din publishing and graphic design
                                        Din publishing and graphic design
                                        Din publishing and graphic design
                                    </p>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div> 
        </section>
    );
}