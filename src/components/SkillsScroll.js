import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '../assets/CSS/skillScroll.css';
import { useEffect } from 'react';



export const SkillsScroll = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        let items = gsap.utils.toArray('ul li');

        gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });

        const dimmer =gsap
            .timeline()
            .to(items.slice(1), {
            opacity: 1,
            stagger: 0.5,
            })
            .to(
            items.slice(0, items.length - 1),
            {
                opacity: 0.2,
                stagger: 0.5,
            },
            0
            );

        ScrollTrigger.create({
            trigger: items[0],
            endTrigger: items[items.length - 1],
            start: 'center center',
            end: 'center center',
            animation: dimmer,
            scrub: 0.2,
          });

        gsap.fromTo(
            document.documentElement,
            {
              '--chroma': 0,
            },
            {
              '--chroma': 0.3,
              ease: 'none',
              scrollTrigger: {
                scrub: 0.2,
                trigger: items[0],
                start: 'center center+=40',
                end: 'center center',
              },
            }
          )
        gsap.fromTo(
            document.documentElement,
            {
              '--chroma': 0.3,
            },
            {
              '--chroma': 0,
              ease: 'none',
              scrollTrigger: {
                scrub: 0.2,
                trigger: items[items.length - 2],
                start: 'center center',
                end: 'center center-=40',
              },
            }
          );
    });
    return (
        <div className='skillscroll-container'>
            <main>
                <section className="scroll fluid">
                    <h2>I can</h2>
                    <ul aria-hidden="true" style={{"--count": 5}}>
                    <li style={{"--i": 0}}>Code</li>
                    <li style={{"--i": 1}}>Design</li>
                    <li style={{"--i": 2}}>Learn</li>
                    <li style={{"--i": 3}}>Create</li>
                    <li style={{"--i": 4}}>Innovate</li>
                    </ul>
                </section>
            </main>
        </div>
    )
}