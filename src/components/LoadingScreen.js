import React, { useEffect, useRef, useState } from "react";

const LoadingScreen = () => {
  const canvasRef = useRef(null);
  const [isScreenClear, setIsScreenClear] = useState(false);
  const [loadingTextOpacity, setLoadingTextOpacity] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let mousePos = [-500, -500];
    let dots = [];
    let startDotCount = width > 640 ? 300 : 200;
    let currentDotCount = 0;
    let amplitude = 400;
    let frequency = 0.075;
    let visibleDuration = 6000;
    let invisibleDuration = 3000;

    canvas.width = width;
    canvas.height = height;

    if (window.devicePixelRatio > 1) {
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    class Dot {
      constructor(opts) {
        this.ctx = opts.ctx;
        this.startTime = opts.startTime;
        this.frequency = opts.frequency || 5;
        this.amplitude = opts.amplitude || 400;
        this.fill = opts.fill;
        this.color = opts.color || [0, 0, 0];
        this.size = Math.random() * 3; // Random size
        this.speed = Math.random() * 0.4;
        this.section = opts.section;
        this.opacity = 0;
        this.maxSize = opts.maxSize || 20;
        this.maxSpeed = opts.maxSpeed || 1;
        this.x = opts.x || Math.random() * width;
        this.endFunc = opts.endFunc ? opts.endFunc.bind(this) : undefined;
        this.removeFunc = opts.removeFunc ? opts.removeFunc.bind(this) : undefined;
      }

      draw() {
        let x = this.x,
          y = this._getYPos(),
          isOffScreenX = x >= width + this.size / 2,
          isOffScreenY = y <= 0 + this.size / 2;

        if (isOffScreenY && isScreenClear && this.removeFunc) {
          this.removeFunc();
        } else if (isOffScreenX && this.endFunc) {
          this.endFunc();
        }

        if (isScreenClear) this.speed += 0.005;
        if (this.speed < this.maxSpeed) this.speed += 0.01;
        if (this.opacity < 1) this.opacity += 0.025;

        this.x += this.speed;

        ctx.fillStyle = `rgba(${this.color.join(",")}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, y, this.size, 0, 2 * Math.PI);
        ctx.closePath();
        this.fill ? ctx.fill() : ctx.stroke();
      }

      _getYPos() {
        return (
          this.amplitude * Math.tan((Math.PI * (this.x / width)) * this.frequency - this.x / 10) +
          height / 2
        );
      }
    }

    const createDots = () => {
      for (let i = 0; i <= startDotCount; i++) {
        let dot = new Dot({
          ctx: ctx,
          color: Math.random() > 0.75 ? [255, 255, 0] : [0, 0, 0], // Some yellow dots
          startTime: performance.now(),
          frequency: frequency,
          maxAmplitude: amplitude,
          maxSize: Math.random() * 30, // Varied sizes
          maxSpeed: Math.random() * 0.45 / (width > 640 ? 3 : 4),
          section: Math.random() * 5 / 2 + 1,
          fill: true,
          endFunc: function () {
            this.x = Math.random() * this.size - this.size * 2;
          },
          removeFunc: function () {
            dots.splice(dots.indexOf(this), 1);
            currentDotCount--;
          },
        });

        dots.push(dot);
        currentDotCount++;
      }
    };

    const draw = () => {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);
      dots.forEach((dot) => dot.draw());

      ctx.textAlign = "center";
      ctx.font = "24px Roboto Mono"; // Bigger text
      ctx.fillStyle = `rgba(230, 230, 230, ${loadingTextOpacity})`;
      ctx.fillText(isScreenClear ? "Finished" : "Loading...", width / 2, height / 2);
    };

    const toggleScreenClear = () => {
      setIsScreenClear((prev) => !prev);
      setTimeout(toggleScreenClear, isScreenClear ? invisibleDuration : visibleDuration);
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const updateMousePos = (e) => {
      mousePos = [e.pageX, e.pageY];
    };

    const clearMousePos = () => {
      mousePos = [-5000, -5000];
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", updateMousePos);
    window.addEventListener("mouseleave", clearMousePos);
    window.addEventListener("touchmove", updateMousePos);
    window.addEventListener("touchend", clearMousePos);

    createDots();
    draw();
    setTimeout(toggleScreenClear, visibleDuration);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", updateMousePos);
      window.removeEventListener("mouseleave", clearMousePos);
      window.removeEventListener("touchmove", updateMousePos);
      window.removeEventListener("touchend", clearMousePos);
    };
  }, [isScreenClear, loadingTextOpacity]);

  return <canvas ref={canvasRef} style={{ position: "fixed", width: "100%", height: "100vh", zIndex: 9999 }} />;
};

export default LoadingScreen;
