import { Modal, Col } from 'react-bootstrap';
import img1 from '../assets/Images/about1.png';
import sign from '../assets/Images/sign.png';
import '../assets/CSS/Modal.css';

export const About = ({ show, handleClose }) => {

    return(
        <div id="about">
                <Modal 
                    show={show} 
                    onHide={handleClose} 
                    centered 
                    size="lg"
                    animation={true}
                    className='about-modal'
                 >
                    <Modal.Body className="p-0">
                    
                        <Col md={12} className="bio-section d-flex align-items-top pt-4">
                        <div className="p-4">
                            <h2>About Me</h2>
                            <p>
                            Hey there! I'm <b style={{color: 'aquamarine', fontStyle:'italic'}}>Shivba</b>, a software developer by day and a bug-squasher by night.
I spend my time wrestling with code, upgrading websites, and making sure your apps load faster than your morning coffee — because trust me, I drink a lot of coffee.<br/><br/>
I’ve successfully migrated many large scale web apps, which makes me wonder why my own website still takes forever to load.<br/><br/>
<span>I’m fluent in Python, JavaScript, C#, and a bunch of other techie stuff that makes websites work smoothly (most of the time). I’ve even dabbled in making APIs, and yes, it’s as nerdy as it sounds.<br/><br/>
{/*I’ve worked with everything from React to SQL, and if there’s a tool out there to make things faster or better, I’ll figure out how to use it.*/}
{/*Fueled by caffeine and curiosity, when I'm not buried in code, you’ll find me dreaming up ways to reduce hosting costs or teaching my digital pen pal to crack better jokes (thanks, OpenAI).<br/><br/> */}
In short: I build things, break things (occasionally), and try to make the web a better place, one API call (and coffee cup) at a time!</span>
                            </p>
                            <img src={img1}></img>
                            <img className='sign' src={sign}></img>
                        </div>
                        </Col>
                    </Modal.Body>
                </Modal>
        </div>
    )
    
}