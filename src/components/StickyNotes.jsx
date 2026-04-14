import React, { useCallback, useRef, useState } from 'react';
import '../assets/CSS/StickyNotes.css';

const NOTES = [
  { id: 'n1', text: '☕ Fueled by coffee and curiosity', rotation: -3, color: '#FFF176' },
  { id: 'n2', text: '🎮 Built my first game at 16', rotation: 2, color: '#B9F6CA' },
  { id: 'n3', text: 'Dark mode is a personality trait', rotation: -5, color: '#E1BEE7' },
  { id: 'n4', text: 'Open to opportunities 👀', rotation: 3, color: '#FFE0B2' },
  { id: 'n5', text: '// TODO: touch grass', rotation: -2, color: '#B3E5FC' },
];

const NOTE_POSITIONS = [
  { id: 'n1', x: 200, y: 800 },
  { id: 'n2', x: 1600, y: 350 },
  { id: 'n3', x: -900, y: 700 },
  { id: 'n4', x: -300, y: -300 },
  { id: 'n5', x: -300, y: -200 },
];

const NOTES_ROOT_POS = { left: 0, top: 0 };

export const StickyNotes = () => {
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

  return (
    <div
      id="card-notes"
      className="sticky-notes-root"
      style={{ position: 'absolute', left: NOTES_ROOT_POS.left, top: NOTES_ROOT_POS.top }}
      aria-label="Sticky notes"
    >
      {NOTES.map((n) => {
        const base = NOTE_POSITIONS.find((p) => p.id === n.id) || { x: 0, y: 0 };
        const off = getOffset(n.id);
        return (
          <div
            key={n.id}
            className="sticky-note"
            style={{
              left: base.x + off.x,
              top: base.y + off.y,
              ['--sn-rot']: `${n.rotation}deg`,
              ['--sn-bg']: n.color,
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onPointerDown={(e) => onDown(e, n.id)}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <div className="sticky-note__pop">
              <div className="sticky-note__band" aria-hidden="true" />
              <div className="sticky-note__text">{n.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

