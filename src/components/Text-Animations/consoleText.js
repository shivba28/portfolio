import React, { useState, useEffect, useRef } from 'react';
import '../../assets/CSS/text.css';


export const ConsoleText = ({ words, colors }) => {
  const [visible, setVisible] = useState(true);
  const [letterCount, setLetterCount] = useState(1);
  const [x, setX] = useState(1);
  const [waiting, setWaiting] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (!colors || colors.length === 0) {
      colors = ['#fff']; // default color if not provided
    }

    const intervalId = setInterval(() => {
        if(isInView){
            if (letterCount === 0 && !waiting) {
                setWaiting(true);
                setTimeout(() => {
                setCurrentColorIndex((currentColorIndex + 1) % colors.length);
                setCurrentWordIndex((currentWordIndex + 1) % words.length);
                setX(1);
                setLetterCount(1);
                setWaiting(false);
                }, 1000);
            } else if (letterCount === words[currentWordIndex].length + 1 && !waiting) {
                setWaiting(true);
                setTimeout(() => {
                setX(-1);
                setLetterCount((prev) => prev + x);
                setWaiting(false);
                }, 1000);
            } else if (!waiting) {
                setLetterCount((prev) => prev + x);
            }
        }
    }, 120);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [letterCount, waiting, currentWordIndex, x, colors, words, isInView]);

  useEffect(() => {
    const underscoreIntervalId = setInterval(() => {
        if (isInView) {
            setVisible((prevVisible) => !prevVisible);
          }
    }, 400);

    return () => clearInterval(underscoreIntervalId); // Clean up on unmount
  }, [isInView]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsInView(entry.isIntersecting);
      });
    });

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <div class='console-container' ref={textRef}>
      <h1 id="text" style={{ color: colors[currentColorIndex], fontStyle:"normal", fontSize: '5rem', fontWeight:"900" }}>
        {words[currentWordIndex].substring(0, letterCount)}
      </h1>
      <div className={`console-underscore ${visible ? '' : 'hidden'}`} id='console'>&#95;</div>
    </div>
  );
};


