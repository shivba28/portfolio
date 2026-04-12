import React, {
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { gsap } from 'gsap';
import { CanvasCenter } from './CanvasCenter';
import { BB8animation } from '../BB8animation';
import bb8Exit from '../../assets/Audios/bb8-exit.mp3';
import '../../assets/CSS/LoadingScreen.css';
import './InfiniteCanvas.css';

export const InfiniteCanvas = ({ children }) => {
  const containerRef = useRef(null);
  const worldRef = useRef(null);
  const introOverlayRef = useRef(null);
  const bb8StageRef = useRef(null);
  const bb8ExitRef = useRef(new Audio(bb8Exit));
  const applyTransformRef = useRef(() => {});

  const [exitMeta, setExitMeta] = useState({
    introComplete: false,
    ballRotation: null,
    handoffWrapperX: null,
  });
  const introComplete = exitMeta.introComplete;

  const [audioEnabled, setAudioEnabled] = useState(false);
  const [exitInProgress, setExitInProgress] = useState(false);

  const introCompleteRef = useRef(false);
  useEffect(() => {
    introCompleteRef.current = introComplete;
  }, [introComplete]);

  useEffect(() => {
    bb8ExitRef.current.volume = audioEnabled ? 1 : 0;
  }, [audioEnabled]);

  const isPanning = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  /* Large enough for cinematic exit (world pan 3000px+); must exceed |final offset|. */
  const BOUNDS = 8000;

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  const applyTransform = useCallback(() => {
    if (worldRef.current) {
      const { x, y } = offset.current;
      worldRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, []);

  applyTransformRef.current = applyTransform;

  const onPointerDown = useCallback((e) => {
    if (!introCompleteRef.current) return;
    const world = worldRef.current;
    const t = e.target;
    if (
      t !== containerRef.current &&
      t !== world &&
      !(world && world.contains(t))
    ) {
      return;
    }
    isPanning.current = true;
    startPos.current = {
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    };
    containerRef.current?.classList.add('canvas-panning');
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      if (!isPanning.current) return;
      const newX = clamp(e.clientX - startPos.current.x, -BOUNDS, BOUNDS);
      const newY = clamp(e.clientY - startPos.current.y, -BOUNDS, BOUNDS);
      offset.current = { x: newX, y: newY };
      applyTransform();
    },
    [applyTransform]
  );

  const onPointerUp = useCallback(() => {
    isPanning.current = false;
    containerRef.current?.classList.remove('canvas-panning');
  }, []);

  const onTouchStart = useCallback((e) => {
    if (!introCompleteRef.current) return;
    const touch = e.touches[0];
    const world = worldRef.current;
    const t = e.target;
    if (
      t !== containerRef.current &&
      t !== world &&
      !(world && world.contains(t))
    ) {
      return;
    }
    isPanning.current = true;
    startPos.current = {
      x: touch.clientX - offset.current.x,
      y: touch.clientY - offset.current.y,
    };
  }, []);

  const onTouchMove = useCallback(
    (e) => {
      if (!isPanning.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      const newX = clamp(touch.clientX - startPos.current.x, -BOUNDS, BOUNDS);
      const newY = clamp(touch.clientY - startPos.current.y, -BOUNDS, BOUNDS);
      offset.current = { x: newX, y: newY };
      applyTransform();
    },
    [applyTransform]
  );

  const onTouchEnd = useCallback(() => {
    isPanning.current = false;
    containerRef.current?.classList.remove('canvas-panning');
  }, []);

  useLayoutEffect(() => {
    applyTransform();
  }, [applyTransform]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => container.removeEventListener('touchmove', onTouchMove);
  }, [onTouchMove]);

  const exitIntro = () => {
    setExitInProgress(true);

    gsap.to('.canvas-intro-overlay .enterButton', { opacity: 0, duration: 0.3 });
    gsap.to('.canvas-intro-overlay .volume', { opacity: 0, duration: 0.3 });

    if (audioEnabled) {
      bb8ExitRef.current.play().catch(() => {});
    }

    const bb8Stage = bb8StageRef.current;
    const ball = bb8Stage?.querySelector('.bb8 .ball');
    const bb8El = bb8Stage?.querySelector('.bb8');
    const W = window.innerWidth;
    const bb8Rect = bb8El?.getBoundingClientRect();
    const centerX0 = bb8Rect
      ? bb8Rect.left + bb8Rect.width / 2
      : W / 2;
    /*
      World + stage pan (0–3s): grid slides left while BB-8 rolls; ends with droid at viewport center.
      Screen x = centerX0 + scrollProxy.x + stage.x → bx1 = W/2 - centerX0 - Ox1.
      No follow-up pan: world stays at Ox1; handoffWrapperX = -Ox1 cancels for CanvasCenter.
    */
    const phase1PanPx = Math.min(5200, Math.max(3000, Math.round(W * 1.05)));
    const Ox1 = -phase1PanPx;
    const bx1 = W / 2 - centerX0 - Ox1;

    const scrollProxy = { x: offset.current.x };
    const syncWorld = () => {
      offset.current.x = scrollProxy.x;
      offset.current.y = offset.current.y || 0;
      applyTransformRef.current();
    };

    const tl = gsap.timeline({
      onComplete: () => {
        let rot = 0;
        if (ball) {
          const r = gsap.getProperty(ball, 'rotation');
          rot = typeof r === 'number' ? r : parseFloat(String(r), 10) || 0;
        }
        setExitMeta({
          introComplete: true,
          ballRotation: rot,
          handoffWrapperX: -Ox1,
        });
        if (audioEnabled) bb8ExitRef.current.pause();
      },
    });

    tl.to(
      scrollProxy,
      {
        x: Ox1,
        duration: 3,
        ease: 'power2.inOut',
        onUpdate: syncWorld,
      },
      0
    );

    if (bb8Stage) {
      tl.to(
        bb8Stage,
        {
          x: bx1,
          duration: 3,
          ease: 'power2.inOut',
        },
        0
      );
    }

    if (ball) {
      tl.to(
        ball,
        {
          rotation: '+=2160',
          duration: 3,
          ease: 'power2.inOut',
        },
        0
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`canvas-container${introComplete ? '' : ' canvas-intro'}`}
      onMouseDown={onPointerDown}
      onMouseMove={onPointerMove}
      onMouseUp={onPointerUp}
      onMouseLeave={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div ref={worldRef} className="canvas-world">
        <div className="canvas-world-anchor">
          <div className="canvas-grid" aria-hidden="true" />
          {!introComplete && (
            <div ref={bb8StageRef} className="intro-bb8-world-stage">
              <BB8animation
                audioEnabled={audioEnabled}
                exitInProgress={exitInProgress}
              />
            </div>
          )}
          <CanvasCenter
            introComplete={introComplete}
            skipBb8EntryMotion={introComplete}
            handoffBallRotation={exitMeta.ballRotation}
            handoffWrapperX={exitMeta.handoffWrapperX}
          />
          {children}
        </div>
      </div>
      <div className="canvas-vignette" aria-hidden="true" />

      {!introComplete && (
        <div
          ref={introOverlayRef}
          className="canvas-intro-overlay canvas-intro-overlay--chrome-only"
        >
          <label
            className="volume"
            style={{
              position: 'fixed',
              top: '0px',
              right: '20px',
              cursor: 'pointer',
              zIndex: 10002,
              pointerEvents: 'auto',
            }}
          >
            <input
              type="checkbox"
              checked={!audioEnabled}
              onChange={() => setAudioEnabled(!audioEnabled)}
            />
            <svg viewBox="0 0 108 96">
              <path d="M7,28 L35,28 L35,28 L59,8 L59,88 L35,68 L7,68 C4.790861,68 3,66.209139 3,64 L3,32 C3,29.790861 4.790861,28 7,28 Z"></path>
              <path d="M79,62 C83,57.3333333 85,52.6666667 85,48 C85,43.3333333 83,38.6666667 79,34 L49,3"></path>
              <path d="M95,69 C101.666667,61.6666667 105,54.3333333 105,47 C105,39.6666667 101.666667,32.3333333 95,25 L75.5,6 L49,33"></path>
            </svg>
          </label>

          <div
            className="enterButton"
            style={{
              top: '70%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'auto',
            }}
          >
            <button
              type="button"
              onClick={exitIntro}
              className="button-49"
              role="button"
            >
              Enter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
