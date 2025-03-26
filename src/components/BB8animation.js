import React, { useState, useEffect, useRef } from "react";
import '../assets/CSS/BB8animation.css';
import bb8Sound from '../assets/Audios/bb8.mp3';
import bb8Sound2 from '../assets/Audios/bb8-2.mp3';
import bb8Sound3 from '../assets/Audios/bb8-3.mp3';
import bb8Sound4 from '../assets/Audios/bb8-4.mp3';

export const BB8animation = ({ audioEnabled }) => {
    const [droidX, setDroidX] = useState(0);
    const [mouseX, setMouseX] = useState(300);
    const [toTheRight, setToTheRight] = useState(true);
    const [speed, setSpeed] = useState(2);
    const [accelMod, setAccelMod] = useState(1);

    const sounds = [bb8Sound, bb8Sound2, bb8Sound3, bb8Sound4];
    const audioRef = useRef(new Audio());

    const playRandomSound = () => {
        if (audioRef.current.paused) {
            const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
            audioRef.current.src = randomSound;
            audioRef.current.play().catch((err) => console.error("Audio play failed", err));
        }
      };

    // Handle mouse movement
    const handleMouseMove = (event) => {
        setMouseX(event.pageX);
        console.log(audioEnabled);
        // Play audio if it's not already playing
        if (audioEnabled) {
            playRandomSound();
        }
    };

    // Handle speed change
    const handleSpeedChange = (e) => {
        const value = parseFloat(e.target.value);
        if (value) setSpeed(value);
    };

    // Handle acceleration change
    const handleAccelChange = (e) => {
        const value = parseFloat(e.target.value);
        if (value) setAccelMod(value);
    };

    // Movement logic
    useEffect(() => {
        const moveDroid = () => {
        let distance = mouseX - droidX;
        let acceleration = Math.abs(distance * accelMod) / 100;

        if (Math.abs(Math.round(droidX) - mouseX) !== 1) {
            if (droidX < mouseX) {
            setDroidX((prevX) => prevX + speed * acceleration);
            setToTheRight(true);
            } else {
            setDroidX((prevX) => prevX - speed * acceleration);
            setToTheRight(false);
            }
        }
        };

        const interval = setInterval(moveDroid, 10);
        return () => clearInterval(interval);
    }, [mouseX, droidX, speed, accelMod]);

    // Attach event listener for mouse movement
    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [audioEnabled]);

    return (
        <div id="bb8-animate">
        {/* Controls */}
        <div className="config">
            <div className="control-wrap">
            <p>Speed: {speed}</p>
            <input
                type="range"
                min="0"
                max="11"
                step="0.1"
                value={speed}
                onChange={handleSpeedChange}
            />
            </div>
            <div className="control-wrap">
            <p>Acceleration: {accelMod}</p>
            <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={accelMod}
                onChange={handleAccelChange}
            />
            </div>
        </div>

        {/* BB-8 */}
        <div className="bb8" style={{ transform: `translateX(${droidX}px)` }}>
            <div
            className={`antennas ${toTheRight ? "right" : ""}`}
            style={{
                transform: `translateX(${(mouseX - droidX) / 25}px) rotateZ(${(mouseX - droidX) / 80}deg)`,
            }}
            >
            <div className="antenna short"></div>
            <div className="antenna long"></div>
            </div>
            <div
            className="head"
            style={{
                transform: `translateX(${(mouseX - droidX) / 15}px) rotateZ(${(mouseX - droidX) / 25}deg)`,
            }}
            >
            <div className="stripe one"></div>
            <div className="stripe two"></div>
            <div className={`eyes ${toTheRight ? "right" : ""}`}>
                <div className="eye one"></div>
                <div className="eye two"></div>
            </div>
            <div className={`stripe detail ${toTheRight ? "right" : ""}`}>
                <div className="detail zero"></div>
                <div className="detail zero"></div>
                <div className="detail one"></div>
                <div className="detail two"></div>
                <div className="detail three"></div>
                <div className="detail four"></div>
                <div className="detail five"></div>
                <div className="detail five"></div>
            </div>
            <div className="stripe three"></div>
            </div>
            <div className="ball" style={{ transform: `rotateZ(${droidX / 2}deg)` }}>
            <div className="lines one"></div>
            <div className="lines two"></div>
            <div className="ring one"></div>
            <div className="ring two"></div>
            <div className="ring three"></div>
            </div>
            <div className="shadow"></div>
        </div>

        {/* Instructions */}
        <div className="instructions">
            <p>Move your mouse.</p>
        </div>
        </div>
    );
};