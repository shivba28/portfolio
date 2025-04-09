import { Col, NavLink, Row } from 'react-bootstrap';
import '../assets/CSS/Contact.css';
import img from '../assets/Images/contact.png';
import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import gsap from "gsap";

export const Contact = () => {
  const form = useRef();
  const userName = useRef(null);
  const userEmail = useRef(null);
  const userMessage = useRef(null);
  const mm = gsap.matchMedia();
  let dataAosOffset = 1500;

  mm.add("(max-width: 767px)", () => {dataAosOffset = 0;})
  

  // <!-- emailjs to mail contact form data -->
  emailjs.init("m6mPxttHF1Ya0wQ3-");

        
  const validateForm = () => {
    const name = userName.current.value;
    const email = userEmail.current.value;
    const message = userMessage.current.value;
              
    // Validation functions
          function validateEmail(email) {
              const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return re.test(String(email).toLowerCase());
          }

          function validateName(name) {
              return name.length >= 3; // Ensure the name has at least 3 characters
          }

          function validateMessage(message) {
              return message.length >= 15; // Ensure the message has at least 15 characters
          }

          // Check validations
          if (!validateName(name)) {
              alert("Please enter your full name with at least 3 characters.");
              return;
          }

          if (!validateEmail(email)) {
              alert("Please enter a valid email address.");
              return;
          }

          if (!validateMessage(message)) {
              alert("Please enter a message with at least 15 characters.");
              return;
          }
  }

    const sendEmail = (e) => {
      e.preventDefault();
      if(validateForm()) {
        console.log('Validated')
      

        emailjs.send('service_x2gf7d5', 'template_826fsnl', {
          to_name: "Shivba",
          from_name: userName.current.value,
          message: userMessage.current.value,
          reply_to: userEmail.current.value
        })
          .then( (response) => {
              console.log('SUCCESS!', response.status, response.text);
              document.getElementById("contact-form").reset();
              alert("Form Submitted Successfully");
          }, (error) => {
              console.log('FAILED...', error);
              alert("Form Submission Failed! Try Again");
          });

      }  else {
        console.log('Validation Failed')
      }
    };

    return(
        <section className="contact content" id='contact'>
            {/* <div className="title text-center d-flex flex-wrap pt-4 bg-gradient" data-aos="fade-down">
                <div className="slogan-left ms-auto"><h1 className="left">CONTACT</h1></div>
                <div className="slogan-right me-auto"><h1 className="right">ME</h1></div>
            </div> */}
            <Row>
                <Col sm={12} md={12} lg={6} xl={6} className='d-grid mt-5 col' data-aos="fade-right" data-aos-once="false" data-aos-offset={dataAosOffset}>
                    <img className='img mx-auto' src={img} />
                </Col>
                <Col sm={12} md={12} lg={6} xl={6} className='d-grid mt-5 col' data-aos="fade-left" data-aos-once="false" data-aos-offset={dataAosOffset}>
                <div id="form-content" className='mx-auto rounded-4 bg-light bg-gradient'>
                  <header id="header" className="bg-black bg-gradient rounded-top-4">Let's Connect</header>
                  <form className='form d-grid mx-5' ref={form} id="contact-form" onSubmit={sendEmail}>
                    <div className="form__group field">
                      <span className="form__label">Name</span>
                      <input data-cursor="text" ref={userName} className='form__field' type="text" name="user_name" placeholder='Name' id='name' />
                    </div>
                    <div className="form__group field">
                      <span className="form__label">Email</span>
                      <input data-cursor="text" ref={userEmail} className='form__field' type="email" name="user_email" placeholder='Email' id='email' />
                    </div>
                    <div className="form__group field">
                      <span className="form__label">Message</span>
                      <textarea data-cursor="text" ref={userMessage} className='form__field' name="message" placeholder='Message' id='message' />
                    </div>
                    <div className='d-flex flex-row flex-wrap'>
                      <button data-cursor="block" data-cursor-style="background: transparent" className='mt-sm-5 mt-3 me-auto text-uppercase' type="submit">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                          </svg>
                          &nbsp;Send
                        </span>
                      </button>
                      <button data-cursor="block" data-cursor-style="background: transparent" className='mt-sm-5 mt-3 ms-auto text-uppercase' type='reset'>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                          &nbsp;Reset
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
                </Col>
            </Row>
        </section>
    )
}