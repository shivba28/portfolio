import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-scroll";
import navIcon1 from '../assets/Logos/nav-icon1.svg';
import navIcon2 from '../assets/Logos/github-mark-white.svg';
import logo from '../assets/Logos/bitmoji.ico';

export const NavBar = ({openModal}) => {
    const [activeLink, setActiveLink] = useState('home');
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
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
      }

    return (
          <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
            <Container>
              <Navbar.Brand href="/">
                <img src={logo} alt="Logo" style={{width: "80px", height: "80px"}}/>
              </Navbar.Brand>
              <h1 style={{fontFamily: "Kranky"}}>SHI<span style={{color:"#eb667e"}}>VB</span>A <span style={{color:"#eb667e"}}>C</span>ODES</h1>
              <Navbar.Toggle aria-controls="basic-navbar-nav">
                <span className="navbar-toggler-icon"></span>
              </Navbar.Toggle>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link href="#home" to="home" spy={true} smooth={true} duration={800} className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                  <Nav.Link to="skill" spy={true} smooth={true} duration={800} href="#skill" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
                  <Nav.Link href="#project" to="project" spy={true} smooth={true} duration={800} className={activeLink === 'project' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('project')}>Projects</Nav.Link>
                  <Nav.Link href="#about" to="about" onClick={openModal} className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link'}>About</Nav.Link>
                </Nav>
                
                <span className="navbar-text">
                  <div className="social-icon">
                    <a href="https://www.linkedin.com/in/shivba-pawar/" target="_blank" rel="noreferrer"><img src={navIcon1} alt="" /></a>
                    <a href="https://github.com/shivba28" target="_blank" rel="noreferrer"><img src={navIcon2} alt="" /></a>
                  </div>
                    <a activeClass="link" to="contact" spy={true} smooth={true} duration={800} className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} href="#contact"><button className="vvd"><span>Let’s Connect</span></button></a>
                </span>
              </Navbar.Collapse>
            </Container>
          </Navbar>
      )
}