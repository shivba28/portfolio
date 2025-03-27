import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import '../assets/CSS/LoadingScreen.css';
import waterEntry from '../assets/Audios/waterEntryShort.mp3';
import waterExit from '../assets/Audios/short.mp3';
import bb8Exit from '../assets/Audios/bb8-exit.mp3';
import { BB8animation } from './BB8animation';

export const LoadingScreen = ({ setLoading }) => {
  const canvasRef = useRef(null);
  const dots = useRef([]);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const dotCount = width > 640 ? 150 : 80; // Adjust count for mobile
  let isVacuumActive = false;
  const gifRef = useRef(null); // Reference to the GIF

  const loadStartRef = useRef(new Audio(waterEntry));
  const loadEndRef = useRef(new Audio(waterExit));
  const bb8ExitRef = useRef(new Audio(bb8Exit));

  const [animationStarted, setAnimationStarted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  

  // Set initial volume based on state
  useEffect(() => {
    loadStartRef.current.volume = audioEnabled ? 1 : 0;
    loadEndRef.current.volume = audioEnabled ? 0.1 : 0;
    bb8ExitRef.current.volume = audioEnabled ? 1 : 0;
  }, [audioEnabled]);


  // Function to play sound if enabled (only called once)
  const playSound = (sound) => {
    sound.current.play();
  };

  const exitBB8 = () => {
      gsap.to(".bb8 .ball", {
        x: window.innerWidth, // Move BB-8 out of the screen
        rotation: 360 * 3, // Make BB-8 roll while exiting
        duration: 3, // Animation duration
        ease: "power1.inOut",
        onStart: () => {
          gsap.to(".enterButton", { opacity: 0, duration: 2 });
          playSound(bb8ExitRef);
        },
        onComplete: () => {
            bb8ExitRef.current.pause();
            startAnimation(); // Call parent function to switch screens
        },
        });

        // Animate BB-8 head (but don't rotate it)
        gsap.to(".bb8 .head", {
        x: window.innerWidth, // Move the whole BB-8 out of the screen
        duration: 3,
        ease: "power1.inOut",
        });

        // Animate BB-8 antennas (but don't rotate it)
        gsap.to(".bb8 .antennas", {
            x: window.innerWidth, // Move the whole BB-8 out of the screen
            duration: 3,
            ease: "power1.inOut",
        });

        // Animate BB-8 shadow (but don't rotate it)
        gsap.to(".bb8 .shadow", {
            x: window.innerWidth, // Move the whole BB-8 out of the screen
            duration: 3,
            ease: "power1.inOut",
        });
  }

  


  const startAnimation = () => {
    setAnimationStarted(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false); // Hides the loading screen after 12 seconds
    }, 10000);


    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    if (window.devicePixelRatio > 1) {
      const scale = window.devicePixelRatio;
      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(scale, scale);
    }

    // Add transition for background color change
    canvas.style.transition = "background-color 1s ease"; // Smooth transition for background color

    // Create a single dot with shooting star reverse movement
    const createDot = () => ({
      x: Math.random() * width, // Start randomly along the width
      y: (Math.random() * height) + height, // Start slightly below the screen
      size: Math.random() * 7 + 1, // Varying sizes
      speed: Math.random() * 5 + 1, // Varying speeds
      angle: Math.random() * 20 - 1, // Slightly different angles
      opacity: 1,
      color: Math.random() > 0.7 ? "#42edff" : "#2d9fcc",
      vacuumSpeed: 0, // For vacuum effect later
      driftSpeedX: (Math.random() - 0.5) * 0.5, // Random drift speed in X direction
    });

    // Generate dots
    dots.current = Array.from({ length: dotCount }, createDot);

    // Draw function
    const drawDots = () => {
      ctx.clearRect(0, 0, width, height);
      dots.current.forEach((dot) => {
        ctx.globalAlpha = dot.opacity;
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Animate dots
    const updateDots = () => {
      dots.current.forEach((dot) => {
        if (isVacuumActive) {
          dot.vacuumSpeed += 0.99; // Increase speed upwards
          dot.x += Math.sin(Math.PI / 1) * dot.vacuumSpeed; // Move towards right at 30 degrees
          dot.y -= Math.cos(Math.PI / 6) * dot.vacuumSpeed; // Move upwards at 30 degrees
          dot.opacity -= 0.02; // Fade out faster
        } else {
          dot.y -= Math.cos(Math.PI / 8) * dot.speed; // Move upwards at 30 degrees
          dot.x += dot.driftSpeedX; // Drift slightly left or right
        }

        if(!isVacuumActive)
        {
          // Reset dot when it moves off screen
          if (dot.y < -dot.size || dot.opacity <= 0) {
            Object.assign(dot, createDot());
          }
        }
      });
      drawDots();
    };

    // Start the loading sound when animation begins
    playSound(loadStartRef);

    gsap.ticker.add(updateDots); // Smooth GSAP ticker loop
    

    // Activate the vacuum effect after 7 seconds
    setTimeout(() => {
      isVacuumActive = true;
      gsap.to(".loading-text", { opacity: 0, duration: 1 }); // Fade out text when vacuum starts
      gsap.to(".volume", { opacity: 0, duration: 1 }); 
      gsap.to(".volume", { display: "none", delay: 1 });
      // Stop previous sound and play vacuum exit sound
      loadStartRef.current.pause();
      
      playSound(loadEndRef);

      setTimeout(() => {
        dots.current = []; // Clear all dots
        canvas.style.backgroundColor = "#121212";
      }, 1000); // Give time for vacuum effect before clearing screen
    }, 7000);

    setTimeout(() => {
      gsap.to(".loading-text", { opacity: 1, duration: 1 }); // Fade in the text after 3 second
    }, 3000);

  };

  return (
            <>
              <canvas ref={canvasRef} className="position-fixed top-0 left-0 w-full h-full" style={{backgroundColor: '#163954'}}></canvas>
                {/* Sound Toggle Button */}
                <label 
                  className="volume"
                  style={{
                    position: "fixed",
                    top: "0px",
                    right: "20px",
                    cursor: "pointer",
                    zIndex: 10002,
                  }}
                >
                  <input type="checkbox" checked={!audioEnabled} onChange={() => setAudioEnabled(!audioEnabled)}/>
                  <svg viewBox="0 0 108 96">
                      <path d="M7,28 L35,28 L35,28 L59,8 L59,88 L35,68 L7,68 C4.790861,68 3,66.209139 3,64 L3,32 C3,29.790861 4.790861,28 7,28 Z"></path>
                      <path d="M79,62 C83,57.3333333 85,52.6666667 85,48 C85,43.3333333 83,38.6666667 79,34 L49,3"></path>
                      <path d="M95,69 C101.666667,61.6666667 105,54.3333333 105,47 C105,39.6666667 101.666667,32.3333333 95,25 L75.5,6 L49,33"></path>
                  </svg>
                </label>
              {!animationStarted && (
                <div>
                  <BB8animation audioEnabled={audioEnabled} onExit={startAnimation} />
                  <div className="enterButton" style={{
                    top: "70%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}>
                    {/* <button onClick={startAnimation} className=" button-82-pushable" role="button">
                      <span className="button-82-shadow"></span>
                      <span className="button-82-edge"></span>
                      <span className="button-82-front text">
                        Enter
                      </span>
                    </button> */}
                    <button onClick={exitBB8} className="button-49" role="button">Enter</button>
                  </div>
                </div>
              )}

              {animationStarted && (
                  <div className="loading-text" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "60px", color: "white", opacity: 0, zIndex:9999, fontFamily:"Kranky" }}>
                    Welcome
                  </div>
                )}
            </>
          );
};
