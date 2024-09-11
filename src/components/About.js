import { Modal, Col } from 'react-bootstrap';
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
                 >
                    <Modal.Body className="p-0">
                    
                        <Col md={12} className="bio-section d-flex align-items-top pt-4">
                        <div className="p-4">
                            <h2>About Shivba</h2>
                            <p>
                            Here goes your bio. You can write about your experience, background,
                            and anything you want to share with people visiting your portfolio.
                            </p>
                        </div>
                        </Col>
                    </Modal.Body>
                </Modal>
        </div>
    )
    
}