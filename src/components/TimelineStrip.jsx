import React, { useCallback, useRef, useState } from 'react';
import '../assets/CSS/TimelineStrip.css';

const TIMELINE_EVENTS = [
  { year: '2017', label: 'Started CS Degree', type: 'education' },
  { year: '2021', label: 'First Internship', type: 'work' },
  { year: '2021', label: 'Started Masters', type: 'education' },
  { year: '2023', label: 'PropChain', type: 'project' },
  { year: '2023', label: 'Graduated Masters', type: 'education' },
  { year: '2024', label: 'Full Stack Role', type: 'work' },
  { year: '2026', label: 'Meal Roulette', type: 'project' },
];

const TIMELINE_POS = { left: -600, top: -940 };

const typeColor = (type) => {
  if (type === 'education') return 'var(--yellow)';
  if (type === 'work') return '#3BCEAC';
  return '#FF5E5E';
};

const EVENT_POSITIONS = [
  { x: 0, y: 20, rot: -3 },
  { x: 150, y: -10, rot: 2 },
  { x: 310, y: 34, rot: -4 },
  { x: 470, y: 0, rot: 3 },
  { x: 640, y: 28, rot: -2 },
  { x: 800, y: -6, rot: 2.5 },
  { x: 950, y: 24, rot: -3 },
];

export const TimelineStrip = () => {
  const [dragById, setDragById] = useState(() => ({}));
  const dragRef = useRef({
    id: null,
    startClientX: 0,
    startClientY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
  });

  const getOffset = useCallback(
    (id) => dragById[id] || { x: 0, y: 0 },
    [dragById]
  );

  const onDown = useCallback(
    (e, id) => {
      e.stopPropagation();
      const o = dragById[id] || { x: 0, y: 0 };
      dragRef.current = {
        id,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startOffsetX: o.x,
        startOffsetY: o.y,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [dragById]
  );

  const onMove = useCallback((e) => {
    const id = dragRef.current.id;
    if (!id) return;
    const dx = e.clientX - dragRef.current.startClientX;
    const dy = e.clientY - dragRef.current.startClientY;
    setDragById((prev) => ({
      ...prev,
      [id]: {
        x: dragRef.current.startOffsetX + dx,
        y: dragRef.current.startOffsetY + dy,
      },
    }));
  }, []);

  const onUp = useCallback((e) => {
    if (dragRef.current.id && e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragRef.current = {
      id: null,
      startClientX: 0,
      startClientY: 0,
      startOffsetX: 0,
      startOffsetY: 0,
    };
  }, []);

  const nodes = TIMELINE_EVENTS.map((ev, i) => ({
    ...ev,
    ...EVENT_POSITIONS[i],
    color: typeColor(ev.type),
  }));

  return (
    <section
      id="card-timeline"
      className="timeline-strip"
      style={{ position: 'absolute', left: TIMELINE_POS.left, top: TIMELINE_POS.top }}
      aria-label="Timeline"
    >
      <div className="timeline-notes">
        <svg className="timeline-notes__links" aria-hidden="true">
          {nodes.slice(0, -1).map((a, i) => {
            const b = nodes[i + 1];
            const ao = getOffset(a.year);
            const bo = getOffset(b.year);
            const ax = a.x + ao.x + 90;
            const ay = a.y + ao.y + 54;
            const bx = b.x + bo.x + 90;
            const by = b.y + bo.y + 54;
            const dx = (bx - ax) * 0.5;
            const c1x = ax + dx;
            const c1y = ay - 60;
            const c2x = bx - dx;
            const c2y = by + 60;
            return (
              <path
                key={`${a.year}-${b.year}`}
                d={`M ${ax} ${ay} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${bx} ${by}`}
              />
            );
          })}
        </svg>

        {nodes.map((ev) => {
          const off = getOffset(ev.year);
          return (
            <div
              key={`${ev.year}-${ev.label}`}
              className="timeline-note"
              style={{
                left: ev.x + off.x,
                top: ev.y + off.y,
                ['--tn-rot']: `${ev.rot}deg`,
                ['--tn-accent']: ev.color,
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onPointerDown={(e) => onDown(e, ev.year)}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <div className="timeline-note__pop">
                <div className="timeline-note__band" aria-hidden="true" />
                <div className="timeline-note__year">{ev.year}</div>
                <div className="timeline-note__label">{ev.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

