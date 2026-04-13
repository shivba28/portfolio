import React, { useCallback, useRef, useState } from 'react';
import '../assets/CSS/NowLearning.css';

const NOW_LEARNING = {
  label: 'NOW LISTENING',
  title: 'Changes',
  subtitle: 'Charlie Puth',
  side: 'A',
  duration: '3:02 mins',
};

const BASE_POS = { left: -600, top: -650 };

export const NowLearning = () => {
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const dragRef = useRef({
    active: false,
    startClientX: 0,
    startClientY: 0,
    startX: 0,
    startY: 0,
  });

  const onDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = {
      active: true,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startX: drag.x,
      startY: drag.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [drag.x, drag.y]);

  const onMove = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startClientX;
    const dy = e.clientY - dragRef.current.startClientY;
    setDrag({ x: dragRef.current.startX + dx, y: dragRef.current.startY + dy });
  }, []);

  const onUp = useCallback((e) => {
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragRef.current.active = false;
  }, []);

  return (
    <section
      id="now-learning"
      className="now-learning"
      style={{
        position: 'absolute',
        left: BASE_POS.left + drag.x,
        top: BASE_POS.top + drag.y,
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      aria-label="Now learning widget"
    >
      <div className="now-learning__label">
        <span className="now-learning__labelText">{NOW_LEARNING.label}</span>
        <span className="now-learning__rec" aria-hidden="true">
          <span className="now-learning__dot" /> REC
        </span>
      </div>

      <div className="cassette">
        <div className="cassette__shell">
          <div className="cassette__window" aria-hidden="true" />
          <div className="cassette__spool cassette__spool--left" aria-hidden="true">
            <div className="cassette__spoolInner" />
          </div>
          <div className="cassette__spool cassette__spool--right" aria-hidden="true">
            <div className="cassette__spoolInner" />
          </div>
          <svg className="cassette__ribbon" viewBox="0 0 300 60" aria-hidden="true">
            <path
              d="M25 42 C 80 20, 140 54, 190 34 C 235 16, 260 26, 275 34"
              fill="none"
              stroke="rgba(250,250,245,0.85)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
          <div className="cassette__side" aria-hidden="true">
            SIDE {NOW_LEARNING.side}
          </div>
        </div>
      </div>

      <div className="now-learning__text">
        <div className="now-learning__title">{NOW_LEARNING.title}</div>
        <div className="now-learning__subtitle">{NOW_LEARNING.subtitle}</div>
      </div>

      <div className="now-learning__meta" aria-hidden="true">
        <span className="now-learning__metaLeft">SIDE {NOW_LEARNING.side}</span>
        <span className="now-learning__metaRight">{NOW_LEARNING.duration}</span>
      </div>
    </section>
  );
};

