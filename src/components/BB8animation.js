import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import '../assets/CSS/BB8animation.css';
import bb8Sound from '../assets/Audios/bb8.mp3';
import bb8Sound2 from '../assets/Audios/bb8-2.mp3';
import bb8Sound3 from '../assets/Audios/bb8-3.mp3';
import bb8Sound4 from '../assets/Audios/bb8-4.mp3';
import bb8Exit from '../assets/Audios/bb8-exit.mp3';

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export const BB8animation = ({ audioEnabled, onExit, exitInProgress = false }) => {
    const bb8Ref = useRef(null);
    const droidXRef = useRef(0);
    const mouseXRef = useRef(300);
    const [droidX, setDroidX] = useState(0);
    const [mouseX, setMouseX] = useState(300);
    const [look, setLook] = useState({
        headTx: 0,
        headRz: 0,
        headRx: 0,
        antTx: 0,
        antRz: 0,
    });
    const [toTheRight, setToTheRight] = useState(true);
    const [speed, setSpeed] = useState(2);
    const [accelMod, setAccelMod] = useState(1);
    const [isExiting, setIsExiting] = useState(false); // Exit state

    const sounds = [bb8Sound, bb8Sound2, bb8Sound3, bb8Sound4];
    const audioRef = useRef(new Audio());
    const bb8ExitRef = useRef(new Audio(bb8Exit));

    useEffect(() => {
        droidXRef.current = droidX;
    }, [droidX]);

    const playRandomSound = () => {
        if (audioRef.current.paused) {
            const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
            audioRef.current.src = randomSound;
            audioRef.current.play().catch((err) => console.error("Audio play failed", err));
        }
      };

    // Handle mouse movement — head/antennas aim toward cursor (screen-space)
    const handleMouseMove = (event) => {
        if (!isExiting && !exitInProgress) {
            const mx = event.pageX;
            setMouseX(mx);
            mouseXRef.current = mx;
            const el = bb8Ref.current;
            if (el) {
                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const chaseDx = event.clientX - cx;
                const chaseGap = Math.abs(mouseXRef.current - droidXRef.current);
                const stationary = chaseGap < 28;

                if (stationary) {
                    const margin = 14;
                    if (event.clientX > cx + margin) setToTheRight(true);
                    else if (event.clientX < cx - margin) setToTheRight(false);
                }

                let headTx;
                let headRz;
                let headRx;
                let antTx;
                let antRz;

                if (stationary) {
                    const nx = (event.clientX / window.innerWidth - 0.5) * 2;
                    headTx = clamp(nx * 22, -18, 18);
                    headRz = clamp(nx * 32, -30, 30);
                    headRx = 0;
                    antTx = clamp(nx * 14, -12, 12);
                    antRz = clamp(nx * 16, -14, 14);
                } else {
                    headTx = clamp(chaseDx / 15, -18, 18);
                    headRz = clamp(chaseDx / 20, -30, 30);
                    headRx = 0;
                    antTx = clamp(chaseDx / 30, -12, 12);
                    antRz = clamp(chaseDx / 80, -14, 14);
                }

                setLook({ headTx, headRz, headRx, antTx, antRz });
            }
            if (audioEnabled) {
              playRandomSound();
            }
            else {
              audioRef.current.pause();
            }
        }
    };

    // Optional: Enter key triggers onExit (only when parent supplies onExit)
    useEffect(() => {
        if (!onExit) return undefined;

        const handleKeyDown = (event) => {
        if (event.key === "Enter" && !isExiting) {
            setIsExiting(true);

            gsap.to(".bb8 .ball", {
            x: window.innerWidth,
            rotation: 360 * 3,
            duration: 3,
            ease: "power1.inOut",
            onStart: () => {
                gsap.to(".enterButton", { opacity: 0, duration: 2 });
                if(audioEnabled){
                  bb8ExitRef.current.play().catch((err) => console.error("Audio play failed", err));
                }
            },
            onComplete: () => {
                if(audioEnabled) bb8ExitRef.current.pause();
                onExit();
            },
            });

            gsap.to(".bb8 .head", {
            x: window.innerWidth,
            duration: 3,
            ease: "power1.inOut",
            });

            gsap.to(".bb8 .antennas", {
                x: window.innerWidth,
                duration: 3,
                ease: "power1.inOut",
            });

            gsap.to(".bb8 .shadow", {
                x: window.innerWidth,
                duration: 3,
                ease: "power1.inOut",
            });
        }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isExiting, onExit, audioEnabled]);

    // Movement logic
    useEffect(() => {
        if (!isExiting && !exitInProgress) {
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
        }
    }, [mouseX, droidX, speed, accelMod, isExiting, exitInProgress]);

    // Attach event listener for mouse movement
    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [audioEnabled, isExiting, exitInProgress]);

    return (
        <div id="bb8-animate">

        {/* BB-8 */}
        <div ref={bb8Ref} className="bb8" style={{ transform: `translateX(${droidX}px)` }}>
            <div
            className={`antennas ${toTheRight ? "right" : ""}`}
            style={{
                transform: `translateX(${look.antTx}px) rotateZ(${look.antRz}deg)`,
            }}
            >
                <div className="antenna short"></div>
                <div className="antenna long"></div>
            </div>
            <div
            className="head"
            style={{
                transform: `translateX(${look.headTx}px) rotateX(${look.headRx}deg) rotateZ(${look.headRz}deg)`,
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
            <div
              className="ball"
              style={
                exitInProgress || isExiting
                  ? undefined
                  : { transform: `rotateZ(${droidX / 2}deg)` }
              }
            >
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