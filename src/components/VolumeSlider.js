import React, { useState, useEffect, useRef } from "react";
import '../assets/CSS/VolumeSlider.css';

export const VolumeSlider = () => {
    const [charge, setCharge] = useState(0);
    const [locked, setLocked] = useState(false);
    const [secure, setSecure] = useState(false);
    const sliderRef = useRef(null);
    const handlerRef = useRef(null);
    const iconRef = useRef(null);
    let chargeInterval, releaseInterval, animateInterval;

    const maxDuration = 1000;
  
  const map = (number, minIn, maxIn, minOut, maxOut) => 
    ((number - minIn) * (maxOut - minOut)) / (maxIn - minIn) + minOut;

  const chargeHandler = () => {
    if (locked) return;
    setSecure(true);

    if (handlerRef.current) {
      handlerRef.current.style.visibility = "hidden";
      handlerRef.current.style.opacity = "0";
    }

    let startTime = Date.now();
    chargeInterval = setInterval(() => {
      let elapsed = Date.now() - startTime;
      let newCharge = elapsed < 50 ? 0 : map(elapsed, 0, maxDuration, 0, 100);
      setCharge(newCharge);

      if (iconRef.current) {
        iconRef.current.style.transform = `rotate(${-newCharge / (20 / 9)}deg)`;
      }

      if (elapsed >= maxDuration) {
        clearInterval(chargeInterval);
        setCharge(100);
        if (iconRef.current) iconRef.current.style.transform = "rotate(-45deg)";
      }
    }, 5);
  };

  const releaseHandler = () => {
    if (locked || !secure) return;

    setLocked(true);

    clearInterval(chargeInterval);
    let currentCharge = charge;

    if (currentCharge === 0) {
      setLocked(false);
      setSecure(false);
      return;
    }

    releaseInterval = setInterval(() => {
      if (iconRef.current) {
        iconRef.current.style.transform = `rotate(${-currentCharge / 2.2}deg)`;
      }
      currentCharge -= currentCharge * 0.1;

      if (currentCharge <= 0.5) {
        clearInterval(releaseInterval);
        if (iconRef.current) iconRef.current.style.transform = "rotate(0deg)";
        setLocked(false);
        setSecure(false);
      }
    }, 5);
  };

  useEffect(() => {
    const icon = iconRef.current;
    if (icon) {
      icon.addEventListener("mousedown", chargeHandler);
      icon.addEventListener("mouseup", releaseHandler);
      icon.addEventListener("mouseleave", releaseHandler);
      icon.addEventListener("touchstart", chargeHandler);
      icon.addEventListener("touchend", releaseHandler);
      icon.addEventListener("touchleave", releaseHandler);
    }

    return () => {
      if (icon) {
        icon.removeEventListener("mousedown", chargeHandler);
        icon.removeEventListener("mouseup", releaseHandler);
        icon.removeEventListener("mouseleave", releaseHandler);
        icon.removeEventListener("touchstart", chargeHandler);
        icon.removeEventListener("touchend", releaseHandler);
        icon.removeEventListener("touchleave", releaseHandler);
      }
      clearInterval(chargeInterval);
      clearInterval(releaseInterval);
    };
  }, []);

  return (
    <div className="volume-slider">
      {/* <div ref={iconRef} className="volume-icon">
        🎵
      </div>
      
      <div ref={sliderRef} className="volume-track">
        <div ref={handlerRef} className="volume-handle"></div>
      </div>
      <input type="hidden" value={charge} />
       */}
    </div>
  );
}