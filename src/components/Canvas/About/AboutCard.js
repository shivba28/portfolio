import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import logo from '../../../assets/Logos/bitmoji.ico';
import { AboutModal } from './AboutModal';
import './AboutCard.css';

gsap.registerPlugin(Draggable);

export const AboutCard = ({ handoffX = 0 }) => {
  const cardRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return undefined;

    const tilt = (Math.random() - 0.5) * 8;
    gsap.set(el, { rotation: tilt });

    const draggable = Draggable.create(el, {
      type: 'x,y',
      bounds: { minX: -1800, maxX: 1800, minY: -1800, maxY: 1800 },
      inertia: false,
      cursor: 'grab',
      activeCursor: 'grabbing',
      onPress() {
        gsap.to(el, {
          scale: 1.04,
          rotation: 0,
          duration: 0.2,
          ease: 'power2.out',
        });
      },
      onRelease() {
        const nextTilt = (Math.random() - 0.5) * 6;
        gsap.to(el, {
          scale: 1,
          rotation: nextTilt,
          duration: 0.3,
          ease: 'back.out(2)',
        });
      },
    })[0];

    return () => {
      draggable.kill();
    };
  }, []);

  return (
    <>
      <div
        id="card-about"
        className="about-card-anchor"
        style={{
          transform: `translateX(${handoffX}px)`,
        }}
      >
        <div
          ref={cardRef}
          className="about-card"
          id="about-card"
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
        <div className="about-card-photo">
          <img src={logo} alt="" className="about-bitmoji" />
          <div className="about-card-photo-label">shivba.exe</div>
        </div>

        <div className="about-card-strip">
          <div className="about-card-name">Shivba Pawar</div>
          <p className="about-card-bio">
            Full-stack dev by day, bug-squasher by night. Building things with
            .NET, React &amp; way too much coffee ☕
          </p>
          <div className="about-card-tags">
            <span className="about-tag">Garden Grove USD</span>
            <span className="about-tag">MS @ Westcliff</span>
          </div>
          <button
            type="button"
            className="about-learn-more"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            Learn More →
          </button>
        </div>

        <div className="about-card-tape" aria-hidden="true" />
        </div>
      </div>

      <AboutModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};
