import '../assets/CSS/skillScroll.css';
import { useRef } from 'react';

export const SkillsScroll = () => {

  const hRef = useRef(null);
  const listRef = useRef(null);
  const lastLiRef = useRef(null);
  
    return (
        <div className='skillscroll-container'>
          <main>
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
          </main>
        </div>
    )
}