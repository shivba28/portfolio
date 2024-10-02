import React, { useEffect, useState, useRef } from 'react';
import '../../assets/CSS/text.css';

export const TextScramble = ({ phrases }) => {
    const [isVisible, setIsVisible] = useState(false);
  const elRef = useRef(null);
  const frameRequestRef = useRef(null);
  const queueRef = useRef([]);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const frameRef = useRef(0);
  const resolveRef = useRef(null);

  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const update = () => {
    let output = '';
    let complete = 0;
    const queue = queueRef.current;

    for (let i = 0; i < queue.length; i++) {
      let { from, to, start, end, char } = queue[i];
      if (frameRef.current >= end) {
        complete++;
        output += to;
      } else if (frameRef.current >= start) {
        if (!char || Math.random() < 0.28) {
          char = randomChar();
          queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    if (elRef.current) {
      elRef.current.innerHTML = output;
    }

    if (complete === queue.length) {
      resolveRef.current();
    } else {
      frameRequestRef.current = requestAnimationFrame(update);
      frameRef.current++;
    }
  };

  const setText = (newText) => {
    const oldText = elRef.current ? elRef.current.innerText : '';
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (resolveRef.current = resolve));
    queueRef.current = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queueRef.current.push({ from, to, start, end });
    }

    cancelAnimationFrame(frameRequestRef.current);
    frameRef.current = 0;
    update();

    return promise;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // 10% of the element should be visible
    );

    if (elRef.current) {
      observer.observe(elRef.current);
    }

    return () => {
      if (elRef.current) {
        observer.unobserve(elRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let counter = 0;
    const next = () => {
      setText(phrases[counter]).then(() => {
        setTimeout(next, 2500);
      });
      counter = (counter + 1) % phrases.length;
    };

    next();

    return () => cancelAnimationFrame(frameRequestRef.current);
  }, [isVisible, phrases]);

  return (
        <div className='container-scramble'>
            <div ref={elRef} className="text" data-cursor="text"/>
        </div>
    );
};




