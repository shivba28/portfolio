import React, { useState, useEffect } from 'react';
import { Modal, Col } from 'react-bootstrap';
import '../assets/CSS/Modal.css';

export const About = ({ show, handleClose }) => {

    useEffect(() => {
        if (show) {
          // Add class to body to prevent scrolling and apply background blur
          document.body.classList.add('no-scroll');
          document.body.classList.add('blurred-background');
        } else {
          // Remove class when modal is closed
          document.body.classList.remove('no-scroll');
          document.body.classList.remove('blurred-background');
        }
    
        // Cleanup on unmount
        return () => {
          document.body.classList.remove('no-scroll');
          document.body.classList.remove('blurred-background');
        };
      }, [show]);
    


    return(
        <div id="about">
                <Modal 
                    show={show} 
                    onHide={handleClose} 
                    centered 
                    size="lg"
                    animation={true}
                    className="custom-modal" >
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