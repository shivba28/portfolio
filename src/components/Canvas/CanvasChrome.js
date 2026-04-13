import React, { useLayoutEffect, useRef } from 'react';
import './CanvasChrome.css';
import {
  MINIMAP_NODES,
  WORLD_W,
  WORLD_H,
  SCALE_X,
  SCALE_Y,
} from './canvasNavConfig';

export const CanvasChrome = ({
  panTo,
  zoomPercentLabel,
  onZoomIn,
  onZoomOut,
  offsetRef,
  zoomRef,
  updateChromeRef,
}) => {
  const minimapViewportRef = useRef(null);

  useLayoutEffect(() => {
    const updateMinimap = () => {
      const vp = minimapViewportRef.current;
      if (!vp || !offsetRef?.current || zoomRef?.current == null) return;
      const minimapEl = vp.parentElement;
      const labelEl =
        minimapEl?.querySelector?.('#minimap-label') ||
        document.getElementById('minimap-label');
      const mmW = minimapEl?.clientWidth ?? 160;
      const mmH = minimapEl?.clientHeight ?? 120;
      const labelH = labelEl?.offsetHeight ?? 16;

      const z = zoomRef.current;
      const ox = offsetRef.current.x;
      const oy = offsetRef.current.y;

      /**
       * Coordinate space:
       * - World origin (0,0) is the canvas center (because `.canvas-world-anchor` is centered).
       * - Screen position of a world point is: screen = center + (world * z) + offset.
       * - Therefore world coord at screen center is: camCenter = -offset / z.
       * Minimap nodes are also placed in this centered world space by offsetting with (WORLD_W/2, WORLD_H/2).
       */
      const viewW = window.innerWidth / z;
      const viewH = window.innerHeight / z;
      const camCenterX = -ox / z;
      const camCenterY = -oy / z;
      const camLeft = camCenterX - viewW / 2;
      const camTop = camCenterY - viewH / 2;

      const vpW = viewW * SCALE_X;
      const vpH = viewH * SCALE_Y;
      let vpX = (camLeft + WORLD_W / 2) * SCALE_X;
      let vpY = (camTop + WORLD_H / 2) * SCALE_Y + labelH;

      const minT = labelH;
      const maxL = mmW - vpW;
      const maxT = mmH - vpH;
      vpX = Math.max(0, Math.min(maxL, vpX));
      vpY = Math.max(minT, Math.min(maxT, vpY));

      vp.style.width = `${Math.max(4, vpW)}px`;
      vp.style.height = `${Math.max(4, vpH)}px`;
      vp.style.left = `${vpX}px`;
      vp.style.top = `${vpY}px`;
    };

    if (updateChromeRef && typeof updateChromeRef === 'object') {
      updateChromeRef.current = updateMinimap;
    }
    updateMinimap();

    return () => {
      if (updateChromeRef && typeof updateChromeRef === 'object') {
        updateChromeRef.current = () => {};
      }
    };
  }, [offsetRef, zoomRef, updateChromeRef]);

  const halfW = WORLD_W / 2;
  const halfH = WORLD_H / 2;

  return (
    <div className="canvas-chrome" aria-hidden={false}>
      <nav id="nav-tabs">
        <button
          type="button"
          className="nav-tab nav-tab--first"
          onClick={() => panTo('home')}
        >
          <span className="dot" style={{ background: 'var(--yellow)' }} />
          HOME
        </button>
        <button
          type="button"
          className="nav-tab nav-tab--first"
          onClick={() => panTo('about')}
        >
          <span className="dot" style={{ background: 'var(--forestGreen)' }} />
          ABOUT
        </button>
        <button
          type="button"
          className="nav-tab"
          onClick={() => panTo('projects')}
        >
          <span className="dot" style={{ background: 'var(--pink)' }} />
          PROJECTS
        </button>
        <button
          type="button"
          className="nav-tab"
          onClick={() => panTo('skills')}
        >
          <span className="dot" style={{ background: 'var(--blue)' }} />
          SKILLS
        </button>
        <button
          type="button"
          className="nav-tab"
          onClick={() => panTo('experience')}
        >
          <span
            className="dot"
            style={{
              background: 'var(--white)',
              borderColor: 'var(--black)',
            }}
          />
          EXP
        </button>
        <button
          type="button"
          className="nav-tab"
          onClick={() => panTo('contact')}
        >
          <span className="dot" style={{ background: 'var(--green)' }} />
          CONTACT
        </button>
      </nav>

      <div id="minimap">
        <span id="minimap-label">MINIMAP</span>
        {MINIMAP_NODES.map(({ id, left, top, w, h, color }) => {
          const dotW = Math.max(4, w * SCALE_X);
          const dotH = Math.max(3, h * SCALE_Y);
          const dotLeft = (left + halfW) * SCALE_X;
          const dotTop = (top + halfH) * SCALE_Y + 16;
          return (
            <div
              key={id}
              className="minimap-node"
              style={{
                left: `${dotLeft}px`,
                top: `${dotTop}px`,
                width: `${dotW}px`,
                height: `${dotH}px`,
                background: color,
                border: '1.5px solid #0a0a0a',
              }}
            />
          );
        })}
        <div id="minimap-viewport" ref={minimapViewportRef} />
      </div>

      <div id="zoom-info">
        <button type="button" id="zoom-btn-out" onClick={onZoomOut}>
          −
        </button>
        <span id="zoom-label">{zoomPercentLabel}</span>
        <button type="button" id="zoom-btn-in" onClick={onZoomIn}>
          +
        </button>
      </div>

      <div id="hint">✦ drag to explore the canvas</div>
    </div>
  );
};
