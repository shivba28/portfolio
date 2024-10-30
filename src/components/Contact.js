import { Col, Row } from 'react-bootstrap';
import '../assets/CSS/Contact.css';
import img from '../assets/Images/contact.png';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm('service_x2gf7d5', 'template_826fsnl', form.current, {
          publicKey: 'm6mPxttHF1Ya0wQ3-',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };


    return(
        <section className="contact content" id='contact'>
            <div className="title text-center d-flex flex-wrap pt-4 bg-gradient">
                <div className="slogan-left ms-auto"><h1 className="left">Contact</h1></div>
                <div className="slogan-right me-auto"><h1 className="right">Me</h1></div>
            </div>
            <Row>
                <Col className='col-6 col-xs-12 d-grid mt-5'>
                    <img className='img mx-auto' src={img} />
                </Col>
                <Col className='col-6 col-xs-12 d-grid mt-5'>
                <div id="form-content" className='mx-auto rounded-4 bg-light bg-gradient'>
                <header id="header" className="bg-dark rounded-top-4">Send new Email</header>
                    <form className='form d-grid mx-5' ref={form} onSubmit={sendEmail}>
                        <input data-cursor="text" type="text" name="user_name" placeholder='Name' />
                        <input data-cursor="text" type="email" name="user_email" placeholder='Email' />
                        <textarea data-cursor="text" name="message" placeholder='Message' />
                        <input data-cursor="block" className='mt-5' type="submit" value="Send" />
                    </form>
                </div>
                </Col>
            </Row>
        </section>
    )
}