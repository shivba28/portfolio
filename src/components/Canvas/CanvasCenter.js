import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../../assets/CSS/BB8animation.css';
import './CanvasCenter.css';
/* Wobbly underline beneath "my story" — viewBox matches normalized path */
const HERO_UNDERLINE_D =
  'M 0 12 Q 70 20 140 10 Q 210 2 280 12 Q 335 22 420 12';

export const CanvasCenter = ({
  introComplete = false,
  skipBb8EntryMotion = false,
  handoffBallRotation = null,
  handoffWrapperX = null,
}) => {
  const canvasRootRef = useRef(null);
  const heroRowRef = useRef(null);
  const heroThisRef = useRef(null);
  const heroStoryRef = useRef(null);
  const bb8Ref = useRef(null);
  const headRef = useRef(null);
  const antennasRef = useRef(null);
  /** Matches intro BB-8: eyes / antennas / detail stripe flip with “look” direction */
  const [lookToTheRight, setLookToTheRight] = useState(true);
  useLayoutEffect(() => {
    if (!introComplete) {
      return undefined;
    }

    const wrapper = bb8Ref.current;
    const ball = wrapper?.querySelector('.ball');
    const hThis = heroThisRef.current;
    const hStory = heroStoryRef.current;
    const hRow = heroRowRef.current;
    const root = canvasRootRef.current;
    if (!root || !wrapper || !ball || !hThis || !hStory || !hRow) return undefined;
    const underline = root.querySelector?.('.hero-underline');
    if (underline) {
      gsap.set(underline, { strokeDasharray: 500, strokeDashoffset: 500 });
    }

    gsap.killTweensOf([root, wrapper, ball, hThis, hStory]);

    const handoffX =
      skipBb8EntryMotion && typeof handoffWrapperX === 'number'
        ? handoffWrapperX
        : 0;
    gsap.set(root, {
      xPercent: -50,
      yPercent: -50,
      x: handoffX,
      y: 0,
    });

    gsap.set([hThis, hStory], { opacity: 0, x: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      delay: 1,
    });
    tl.eventCallback('onComplete', () => {
      window.dispatchEvent(new Event('canvas:titleDone'));
    });

    if (skipBb8EntryMotion) {
      gsap.set(wrapper, { clearProps: 'transform' });
      gsap.set(wrapper, { x: 0 });
      if (typeof handoffBallRotation === 'number') {
        gsap.set(ball, { rotation: handoffBallRotation });
      }
    } else {
      const w = window.innerWidth;
      const startX = Math.min(w * 0.58, Math.max(380, w * 0.42));
      gsap.set(wrapper, { clearProps: 'transform' });
      gsap.set(wrapper, { x: startX });
      tl.to(wrapper, {
        x: 0,
        duration: 2.2,
        ease: 'power2.inOut',
      }).to(
        ball,
        {
          rotation: 720,
          duration: 2.2,
          ease: 'power2.inOut',
        },
        0
      );
    }

    tl.fromTo(
      hThis,
      { x: -140, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
      skipBb8EntryMotion ? 0.05 : 0.2
    ).fromTo(
      hStory,
      { x: 140, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
      '+=0.45'
    );
    if (underline) {
      tl.to(
        underline,
        { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' },
        '<'
      );
    }

    return () => {
      tl.kill();
    };
  }, [introComplete, skipBb8EntryMotion, handoffBallRotation, handoffWrapperX]);

  useEffect(() => {
    if (!introComplete) return undefined;

    const head = headRef.current;
    const antennas = antennasRef.current;
    if (head) {
      gsap.set(head, {
        transformPerspective: 500,
        transformOrigin: '50% 50%',
      });
    }

    const handleMouseMove = (e) => {
      if (!bb8Ref.current || !head || !antennas) return;
      const rect = bb8Ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dx = e.clientX - centerX;

      setLookToTheRight((prev) => {
        const margin = 14;
        if (e.clientX > centerX + margin) return true;
        if (e.clientX < centerX - margin) return false;
        return prev;
      });

      const headTiltX = Math.max(-20, Math.min(20, dx / 25));
      const headTiltZ = Math.max(-30, Math.min(30, dx / 20));
      const antennaShift = Math.max(-12, Math.min(12, dx / 30));
      const antennaRot = Math.max(-14, Math.min(14, dx / 80));

      gsap.to(head, {
        x: headTiltX,
        rotateZ: headTiltZ,
        rotateX: 0,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to(antennas, {
        x: antennaShift,
        rotateZ: antennaRot,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [introComplete]);

  useEffect(() => {
    if (!introComplete) return undefined;
    const root = canvasRootRef.current;
    const underline = root?.querySelector?.('.hero-underline');
    if (!underline) return undefined;

    const notify = () => {
      window.dispatchEvent(new Event('canvas:heroUnderlineStart'));
    };

    underline.addEventListener('animationstart', notify, { once: true });
    return () => underline.removeEventListener('animationstart', notify);
  }, [introComplete]);

  return (
    <div
      ref={canvasRootRef}
      className={`canvas-center${introComplete ? '' : ' canvas-center--intro'}`}
    >
      <div
        className="bb8-wrapper"
        ref={bb8Ref}
        style={{ visibility: introComplete ? 'visible' : 'hidden' }}
        aria-hidden={!introComplete}
      >
        <div className="bb8">
          <div
            ref={antennasRef}
            className={`antennas${lookToTheRight ? ' right' : ''}`}
          >
            <div className="antenna short"></div>
            <div className="antenna long"></div>
          </div>
          <div ref={headRef} className="head">
            <div className="stripe one"></div>
            <div className="stripe two"></div>
            <div className={`eyes${lookToTheRight ? ' right' : ''}`}>
              <div className="eye one"></div>
              <div className="eye two"></div>
            </div>
            <div className={`stripe detail${lookToTheRight ? ' right' : ''}`}>
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
          <div className="ball">
            <div className="lines one"></div>
            <div className="lines two"></div>
            <div className="ring one"></div>
            <div className="ring two"></div>
            <div className="ring three"></div>
          </div>
          <div className="shadow"></div>
        </div>
      </div>

      <div
        ref={heroRowRef}
        id="card-hero"
        className="canvas-hero-text"
      >
        <span ref={heroThisRef} className="hero-this-is">
          THIS IS
        </span>
        <span className="hero-story-block">
          <span ref={heroStoryRef} className="hero-my-story">
            my story
          </span>
          <svg
            className="hero-underline-svg"
            viewBox="0 0 420 24"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={HERO_UNDERLINE_D}
              fill="none"
              stroke="#F5C842"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="nonScalingStroke"
              className="hero-underline-path hero-underline"
            />
          </svg>
        </span>
      </div>

    </div>
  );
};
