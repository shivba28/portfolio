import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '../assets/CSS/skillScroll.css';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const SkillsScroll = () => {

  const hRef = useRef(null);
  const listRef = useRef(null);
  const lastLiRef = useRef(null);

  useEffect(() => {
    gsap.set("li:not(:first-of-type)", {opacity:0.2, scale:0.8})

    const h1 = hRef.current;
    const lastLi = lastLiRef.current;
    const list = listRef.current;

    // Move until h1 center aligns with last li center, then move 100px further
    const h1TargetY = window.innerHeight / 2 - h1.offsetHeight / 2; // Center of screen



    gsap.timeline({
        scrollTrigger:{
          trigger:list, 
          start:"top top",
          end:"bottom center",
          markers:true,
          scrub:true
        }
      })
      .to("li:not(:first-of-type)", 
        {opacity:1, scale:1, stagger:0.5}
        )
      .to("li:not(:last-of-type)", 
        {opacity:0.2, scale:0.8, stagger:0.5}, 0)

  }, []);
  
    return (
        <div className='skillscroll-container'>
          <section className="scroll fluid">
            <h2 ref={hRef}>I can&nbsp;</h2>
            <ul ref={listRef} style={{"--count": 11}}>
              <li style={{"--i": 0}}>design.</li>
              <li style={{"--i": 1}}>prototype.</li>
              <li style={{"--i": 2}}>solve.</li>
              <li style={{"--i": 3}}>build.</li>
              <li style={{"--i": 4}}>develop.</li>
              <li style={{"--i": 5}}>debug.</li>
              <li style={{"--i": 6}}>learn.</li>
              <li style={{"--i": 7}}>cook.</li>
              <li style={{"--i": 8}}>ship.</li>
              <li style={{"--i": 9}}>prompt.</li>
              <li ref={lastLiRef} style={{"--i": 10}}>collaborate.</li>  
            </ul>
          </section>
        </div>
    )
}