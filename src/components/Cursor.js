import React, { useEffect, useState } from 'react';
import '../assets/CSS/Cursor.css'; // Create a CSS file for styling


export const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);

  const addEventListeners = () => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => setHovered(true));
      el.addEventListener('mouseleave', () => setHovered(false));
    });
  };

  const removeEventListeners = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseenter', onMouseEnter);
    document.removeEventListener('mouseleave', onMouseLeave);
  };

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const onMouseEnter = () => {
    setVisible(true);  // Show the cursor when the mouse enters the window
  };

  const onMouseLeave = () => {
    setVisible(false); // Hide the cursor when the mouse leaves the window
  };

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  return (
    <div
      className={`custom-cursor ${hovered ? 'hovered' : ''}  ${visible ? '' : 'hidden'}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    ></div>
  );
}