import '../assets/CSS/skills.css';
import { ListGroup } from 'react-bootstrap';
import { Stars } from './Bg-Animations/Stars';
import { Clouds } from './Bg-Animations/Clouds';
import progImg from '../assets/Images/lang.png';
import frameImg from '../assets/Images/framework.png';
import techImg from '../assets/Images/tech.png';
import testImg from '../assets/Images/test.png';
import { useEffect, useRef } from 'react';



export const Skills = () => {
    

    const textRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                // Add the class when the text enters the viewport
                Array.from(textRef.current.children).forEach(child => {
                child.classList.add('neon-animate');
            });
              } else {
                // Remove the class when the text leaves the viewport (optional)
                Array.from(textRef.current.children).forEach(child => {
                    child.classList.remove('neon-animate');
                  });
              }
            },
            {
                rootMargin: '-100px 0px 0px 0px',
                threshold: 0, // Trigger when 50% of the text is in the viewport
            }
          );
      
          if (textRef.current) {
            observer.observe(textRef.current); // Observe the target element
          }
      
          // Cleanup the observer when the component is unmounted
          return () => {
            if (textRef.current) {
              observer.unobserve(textRef.current);
            }
          };
        }, []);

    return(
       <section className='skills content' id='skill' >
            <div className="neon" aria-hidden="true" aria-label="my skills" ref={textRef}>
                <span className='neon-animate'>M</span>
                <span className='neon-animate'>y</span>
                <span className='neon-animate'>S</span>
                <span className='neon-animate'>k</span>
                <span className='neon-animate'>i</span>
                <span className='neon-animate'>l</span>
                <span className='neon-animate'>l</span>
                <span className='neon-animate'>s</span>
            </div>
            <div className="card-container">
                <div className="skill-card" id='card1'>
                    <div className="background">
                        <Clouds />
                        <Stars />
                    </div>
                    <div className='content'>
                            <img alt='languages' src={progImg} loading='lazy' />
                            <h4 className='p-3'>Languages</h4>
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
                    </div>
                </div>
                <div className="skill-card" id='card2'>
                    <div className="background">
                        <Clouds />
                        <Stars />
                    </div>
                    <div className='content'>
                            <img alt='tech' src={techImg} loading='lazy' />
                            <h4 className='p-3'>Technologies</h4>
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
                    </div>
                </div>
                <div className="skill-card" id='card3'>
                    <div className="background">
                        <Clouds />
                        <Stars />
                    </div>
                    <div className='content'>
                            <img alt='languages' src={frameImg} loading='lazy' />
                            <h4 className='p-3'>Frameworks</h4>
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
                    </div>
                </div>
                <div className="skill-card" id='card4'>
                    <div className="background">
                        <Clouds />
                        <Stars />
                    </div>
                    <div className='content'>
                            <img alt='languages' src={testImg} loading='lazy' />
                            <h4 className='p-3'>Testing Tools and Concepts</h4>
                            <div className='card-content'>
                                    <ListGroup>
                                        <ListGroup.Item data-cursor="block">Selenium</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Cypress</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Test Driven Dev</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">OOP Concepts</ListGroup.Item>
                                        <ListGroup.Item data-cursor="block">Machine Learning</ListGroup.Item>
                                    </ListGroup>
                                </div>
                    </div>
                </div>
            </div>
    </section>
    )
}