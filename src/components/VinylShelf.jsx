import React, { useCallback, useRef, useState } from 'react';
import './VinylShelf.css';

export const ALBUMS = [
  {
    id: 1,
    title: 'Blonde',
    artist: 'Frank Ocean',
    sleeveColor: '#1a1a1a',
    stripeColor: '#F5C842',
  },
  {
    id: 2,
    title: 'DAMN.',
    artist: 'Kendrick Lamar',
    sleeveColor: '#2D4A8A',
    stripeColor: '#E8C840',
  },
  {
    id: 3,
    title: 'After Hours',
    artist: 'The Weeknd',
    sleeveColor: '#8B2252',
    stripeColor: '#FF5E5E',
  },
  {
    id: 4,
    title: 'Igor',
    artist: 'Tyler, the Creator',
    sleeveColor: '#1A6B3C',
    stripeColor: '#3BCEAC',
  },
];

const BASE_POS = { left: -1100, top: -200 };

export const VinylShelf = () => {
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const dragRef = useRef({
    active: false,
    startClientX: 0,
    startClientY: 0,
    startX: 0,
    startY: 0,
  });

  const onPointerDown = useCallback(
    (e) => {
      e.stopPropagation();
      dragRef.current = {
        active: true,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startX: drag.x,
        startY: drag.y,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [drag.x, drag.y]
  );

  const onPointerMove = useCallback((e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startClientX;
    const dy = e.clientY - dragRef.current.startClientY;
    setDrag({
      x: dragRef.current.startX + dx,
      y: dragRef.current.startY + dy,
    });
  }, []);

  const onPointerUp = useCallback((e) => {
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragRef.current.active = false;
  }, []);

  return (
    <div
      id="vinyl-shelf"
      className="vinyl-shelf"
      style={{
        position: 'absolute',
        left: BASE_POS.left + drag.x,
        top: BASE_POS.top + drag.y,
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      aria-label="Favorite albums shelf"
    >
      <div className="vinyl-shelf__outer">
        <div className="vinyl-shelf__label">MY SHELF</div>
        <div className="vinyl-shelf__records">
          {ALBUMS.map((album) => (
            <div key={album.id} className="vinyl-shelf__slot">
              <div className="vinyl-shelf__tooltip" aria-hidden>
                {album.title} · {album.artist}
              </div>
              <div
                className="vinyl-shelf__sleeve"
                style={{ backgroundColor: album.sleeveColor }}
              >
                <div className="vinyl-shelf__disc" />
                <div
                  className="vinyl-shelf__stripe"
                  style={{ backgroundColor: album.stripeColor }}
                >
                  <div className="vinyl-shelf__stripe-title">{album.title}</div>
                  <div className="vinyl-shelf__stripe-artist">{album.artist}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="vinyl-shelf__plank" aria-hidden="true" />
        <div className="vinyl-shelf__supports" aria-hidden="true">
          <div className="vinyl-shelf__leg" />
          <div className="vinyl-shelf__leg" />
        </div>
      </div>
    </div>
  );
};
