import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-scroll";
import navIcon1 from '../assets/Logos/nav-icon1.svg';
import navIcon2 from '../assets/Logos/github-mark-white.svg';
import logo from '../assets/Logos/bitmoji.ico';
import '../assets/CSS/navbar.css';

export const NavBar = ({openModal}) => {
    const [scrolled, setScrolled] = useState(false);



    useEffect(() => {
        const onScroll = () => {
            if(window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
          <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
            <Container>
              <Navbar.Brand href="/portfolio_2.0" data-cursor="block" data-cursor-style="background: transparent">
                <img src={logo} alt="Logo" style={{width: "80px", height: "80px"}}/>
              </Navbar.Brand>
              {/* <h1 data-cursor="text" style={{fontFamily: "Kranky"}}>SHI<span style={{color:"#eb667e"}}>VB</span>A <span style={{color:"#eb667e"}}>C</span>ODES</h1> */}
              <div className="neon" aria-hidden="true" aria-label="my skills" data-cursor="text">
                <span className='neon-animate'>S</span>
                <span className='neon-animate'>h</span>
                <span className='neon-animate'>i</span>
                <span className='neon-animate'>v</span>
                <span className='neon-animate'>b</span>
                <span className='neon-animate'>a</span>
                <span className='neon-animate'>C</span>
                <span className='neon-animate'>o</span>
                <span className='neon-animate'>d</span>
                <span className='neon-animate'>e</span>
                <span className='neon-animate'>s</span>
            </div>
              <Navbar.Toggle aria-controls="basic-navbar-nav">
                <span className="navbar-toggler-icon"></span>
              </Navbar.Toggle>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto text-center mt-1">
                  <Link data-cursor="block" to="home" spy={true} smooth={true} offset={-50} duration={800} className={'navbar-link link'}>HOME</Link>
                  <Link data-cursor="block" to="skill" spy={true} smooth={true} offset={-50} duration={800} className={'navbar-link link'}>SKILLS</Link>
                  <Link data-cursor="block" to="project" spy={true} smooth={true} offset={-70} duration={800} className={'navbar-link link'}>PROJECTS</Link>
                  <Link data-cursor="block" to="/" spy={true} smooth={true} duration={800} onClick={openModal} className={'navbar-link link'}>ABOUT</Link>
                </Nav>
                
                <span className="navbar-text">
                  <div className="social-icon">
                    <a data-cursor="block" data-cursor-style="background: transparent" href="https://www.linkedin.com/in/shivba-pawar/" target="_blank" rel="noreferrer"><img src={navIcon1} alt="" /></a>
                    <a data-cursor="block" data-cursor-style="background: transparent" href="https://github.com/shivba28" target="_blank" rel="noreferrer"><img src={navIcon2} alt="" /></a>
                  </div>
                    <Link data-cursor="block" data-cursor-style="background: transparent; border-color:transparent;" href="#contact" to="contact" spy={true} smooth={true} offset={-70} duration={800} className={'navbar-link'}><button className="vvd"><span>Let’s Connect</span></button></Link>
                </span>
              </Navbar.Collapse>
            </Container>
          </Navbar>
      )
}