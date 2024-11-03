import { Col, NavLink, Row } from 'react-bootstrap';
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
                      <div class="form__group field">
                        <label for="user_name" class="form__label">Name</label>
                        <input data-cursor="text" className='form__field' type="text" name="user_name" placeholder='Name' id='name' />
                      </div>
                      <div class="form__group field">
                        <label for="user_email" class="form__label">Email</label>
                        <input data-cursor="text" className='form__field' type="email" name="user_email" placeholder='Email' id='email' />
                      </div>
                      <div class="form__group field">
                        <label for="message" class="form__label">Message</label>
                        <textarea data-cursor="text" className='form__field' name="message" placeholder='Message' id='message' />
                      </div>
                        <input data-cursor="block" className='bg-secondary bg-gradient mt-5 btn' type="submit" value="Send" />
                    </form>
                </div>
                </Col>
            </Row>
        </section>
    )
}