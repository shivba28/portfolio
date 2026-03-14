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
    loadEndRef.current.volume = audioEnabled ? 0.3 : 0;
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
  x: Math.random() * width,
  y: (Math.random() * height) + height,
  size: Math.random() * 7 + 1,
  speed: Math.random() * 5 + 1,
  angle: Math.random() * 20 - 1,
  opacity: 1,
  color: Math.random() > 0.7 ? "#42edff" : "#2d9fcc",
  vacuumSpeed: 0,
  driftSpeedX: (Math.random() - 0.5) * 0.5,
  blur: Math.random() * 4 + 1,
  // Wobble
  wobblePhase: Math.random() * Math.PI * 2,
  wobbleSpeed: Math.random() * 0.04 + 0.02,
  wobbleAmount: Math.random() * 0.12 + 0.04,
  // Sway
  swayPhase: Math.random() * Math.PI * 2,
  swaySpeed: Math.random() * 0.02 + 0.01,
  swayAmount: Math.random() * 1.5 + 0.5,
  // Opacity breathe
  opacityPhase: Math.random() * Math.PI * 2,
  opacitySpeed: Math.random() * 0.03 + 0.01,
  baseOpacity: Math.random() * 0.3 + 0.7,

    // Shape deformation
  morphPhase: Math.random() * Math.PI * 2,
  morphSpeed: Math.random() * 0.03 + 0.01,
  morphAmount: Math.random() * 0.18 + 0.05, // how much it squishes (5–23% of radius)
});

dots.current = Array.from({ length: dotCount }, createDot);

// Call this wherever you previously called ctx.arc(x, y, r, 0, Math.PI * 2)
const drawBubblePath = (cx, cy, r, morphPhase, morphAmount) => {
  const m = Math.sin(morphPhase) * r * morphAmount;
  const m2 = Math.cos(morphPhase) * r * morphAmount * 0.7; // secondary axis offset

  // 4-point bezier approximation of a circle, with morph offsets applied
  const k = 0.5522848; // bezier magic number for circle approximation

  const top =    { x: cx,         y: cy - r - m  };
  const right =  { x: cx + r + m2, y: cy          };
  const bottom = { x: cx,         y: cy + r + m  };
  const left =   { x: cx - r - m2, y: cy          };

  const cpK = r * k;

  ctx.beginPath();
  ctx.moveTo(top.x, top.y);

  // top → right
  ctx.bezierCurveTo(
    cx + cpK + m2, cy - r - m,
    cx + r + m2,   cy - cpK,
    right.x, right.y
  );

  // right → bottom
  ctx.bezierCurveTo(
    cx + r + m2, cy + cpK,
    cx + cpK,    cy + r + m,
    bottom.x, bottom.y
  );

  // bottom → left
  ctx.bezierCurveTo(
    cx - cpK + m2, cy + r + m,
    cx - r - m2,   cy + cpK,
    left.x, left.y
  );

  // left → top
  ctx.bezierCurveTo(
    cx - r - m2, cy - cpK,
    cx - cpK,    cy - r - m,
    top.x, top.y
  );

  ctx.closePath();
};

const drawDots = () => {
  ctx.clearRect(0, 0, width, height);

  dots.current.forEach((dot) => {
    const { x, y, opacity } = dot;

    // Apply wobble to radius at draw time (non-destructive, doesn't mutate dot.size)
    const r = dot.size + Math.sin(dot.wobblePhase) * dot.size * dot.wobbleAmount;

    ctx.save();
    ctx.globalAlpha = opacity;

    // --- Outer rim glow ---
    const rimGradient = ctx.createRadialGradient(x, y, r * 0.85, x, y, r * 1.2);
    rimGradient.addColorStop(0, "rgba(100, 220, 255, 0.25)");
    rimGradient.addColorStop(1, "rgba(100, 220, 255, 0)");
    ctx.fillStyle = rimGradient;
    ctx.beginPath();
    ctx.arc(x, y, r * 1.2, 0, Math.PI * 2);
    ctx.fill();

    // --- Bubble body ---
    const bodyGradient = ctx.createRadialGradient(x, y * 0.98, r * 0.1, x, y, r);
    bodyGradient.addColorStop(0, "rgba(180, 240, 255, 0.05)");
    bodyGradient.addColorStop(0.7, "rgba(80, 180, 220, 0.08)");
    bodyGradient.addColorStop(1, "rgba(60, 160, 210, 0.18)");
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    drawBubblePath(x, y, r, dot.morphPhase, dot.morphAmount);
    ctx.fill();

    // --- Rim stroke ---
    ctx.strokeStyle = "rgba(150, 230, 255, 0.55)";
    ctx.lineWidth = r * 0.08;
    ctx.beginPath();
    drawBubblePath(x, y, r, dot.morphPhase, dot.morphAmount);
    ctx.stroke();

    // --- Primary specular highlight ---
    const shine1 = ctx.createRadialGradient(
      x - r * 0.35, y - r * 0.35, 0,
      x - r * 0.35, y - r * 0.35, r * 0.55
    );
    shine1.addColorStop(0, "rgba(255, 255, 255, 0.75)");
    shine1.addColorStop(0.5, "rgba(255, 255, 255, 0.15)");
    shine1.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = shine1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // --- Secondary specular ---
    const shine2 = ctx.createRadialGradient(
      x + r * 0.4, y + r * 0.4, 0,
      x + r * 0.4, y + r * 0.4, r * 0.25
    );
    shine2.addColorStop(0, "rgba(255, 255, 255, 0.4)");
    shine2.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = shine2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });
};

const updateDots = () => {
  dots.current.forEach((dot) => {
    if (isVacuumActive) {
      dot.vacuumSpeed += 0.99;
      dot.x += Math.sin(Math.PI / 1) * dot.vacuumSpeed;
      dot.y -= Math.cos(Math.PI / 6) * dot.vacuumSpeed;
      dot.opacity -= 0.02;
    } else {
      dot.y -= Math.cos(Math.PI / 8) * dot.speed;

      // Sway replaces plain driftSpeedX for a smoother organic path
      dot.x += Math.sin(dot.swayPhase) * dot.swayAmount + dot.driftSpeedX;
      dot.swayPhase += dot.swaySpeed;

      // Wobble phase advances each frame
      dot.wobblePhase += dot.wobbleSpeed;
      dot.morphPhase += dot.morphSpeed;

      // Opacity breathe
      dot.opacity = dot.baseOpacity + Math.sin(dot.opacityPhase) * 0.2;
      dot.opacityPhase += dot.opacitySpeed;
    }

    if (!isVacuumActive) {
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
        canvas.style.backgroundColor = "#030f18";
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
