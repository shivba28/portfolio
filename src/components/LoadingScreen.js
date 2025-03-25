import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
// import soundOnGif from '../assets/Images/soundOn.gif';
import waterEntry from '../assets/Audios/waterEntryShort.mp3';
import waterExit from '../assets/Audios/short.mp3';

export const LoadingScreen = ({ setLoading }) => {
  const canvasRef = useRef(null);
  const dots = useRef([]);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const dotCount = width > 640 ? 150 : 80; // Adjust count for mobile
  let isVacuumActive = false;
  const gifRef = useRef(null); // Reference to the GIF

  const [animationStarted, setAnimationStarted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const loadStartRef = useRef(new Audio(waterEntry));
  const loadEndRef = useRef(new Audio(waterExit));

  // Set initial volume based on state
  useEffect(() => {
    loadStartRef.current.volume = audioEnabled ? 1 : 0;
    loadEndRef.current.volume = audioEnabled ? 1 : 0;
  }, [audioEnabled]);

  // Function to play sound if enabled (only called once)
  const playSound = (sound) => {
    sound.current.volume = audioEnabled ? 1 : 0; // Adjust volume instead of stopping
    sound.current.play();
  };


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
          dot.vacuumSpeed += 0.9; // Increase speed upwards
          dot.x += Math.sin(Math.PI / 1) * dot.vacuumSpeed; // Move towards right at 30 degrees
          dot.y -= Math.cos(Math.PI / 6) * dot.vacuumSpeed; // Move upwards at 30 degrees
          dot.opacity -= 0.02; // Fade out faster
        } else {
          dot.y -= Math.cos(Math.PI / 6) * dot.speed; // Move upwards at 30 degrees
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

    // Activate the vacuum effect after 9 seconds
    setTimeout(() => {
      isVacuumActive = true;
      gsap.to(".loading-text", { opacity: 0, duration: 1 }); // Fade out text when vacuum starts

      // Stop previous sound and play vacuum exit sound
      loadStartRef.current.pause();
      loadEndRef.current.volume = 1;
      loadEndRef.current.play();

      setTimeout(() => {
        dots.current = []; // Clear all dots
        canvas.style.backgroundColor = "#121212";
      }, 1000); // Give time for vacuum effect before clearing screen
    }, 7000);

    setTimeout(() => {
      gsap.to(".loading-text", { opacity: 1, duration: 1 }); // Fade in the text after 3 second
    }, 3000);

  //   return () => {
  //     gsap.ticker.remove(updateDots);
  //   };
  };

  return (
            <>
              <canvas ref={canvasRef} className="position-fixed top-0 left-0 w-full h-full" style={{backgroundColor: '#163954'}}></canvas>

              {!animationStarted && (
                <button
                  onClick={startAnimation}
                  className="enterButton"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: "20px 40px",
                    fontSize: "20px",
                    background: "#007bff",
                  }}
                >
                  Enter
                </button>
              )}

              {animationStarted && (
                <>
                  {/* Sound Toggle Button */}
                  <button
                    onClick={() => setAudioEnabled(prev => !prev)}
                    className="soundButton"
                    style={{
                      top: "20px",
                      right: "20px",
                      padding: "10px 20px",
                      fontSize: "16px",
                      background: audioEnabled ? "#28a745" : "#dc3545"
                    }}
                  >
                    {audioEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
                  </button>
                  <div className="loading-text" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "60px", color: "white", opacity: 0, zIndex:9999, fontFamily:"Kranky" }}>
                    Welcome
                  </div>
                </>
                )}
            </>
          );
};
