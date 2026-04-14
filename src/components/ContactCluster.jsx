import React, { useCallback, useRef, useState } from 'react';
import '../assets/CSS/ContactCluster.css';

const CONTACTS = [
  { label: 'GitHub', href: 'https://github.com/shivba28', icon: 'github', rot: -3, x: 0, y: 0 },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/shivba-pawar', icon: 'linkedin', rot: 0, x: 105, y: 20 },
  { label: 'Email', href: 'mailto:shivba28@gmail.com', icon: 'email', rot: 4, x: 210, y: -6 },
];

const CONTACT_POS = { left: -1180, top: 50 };

const Pin = () => (
  <svg className="contact-pin" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="18" r="10" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="3" />
    <path d="M32 28 L38 44 L32 56 L26 44 Z" fill="var(--ink)" />
    <circle cx="32" cy="18" r="3" fill="var(--ink)" />
  </svg>
);

const ContactIcon = ({ kind }) => {
  if (kind === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 .5C5.73.5.75 5.7.75 12.14c0 5.15 3.29 9.52 7.86 11.06.58.11.79-.26.79-.57 0-.28-.01-1.02-.02-2-3.2.72-3.88-1.59-3.88-1.59-.52-1.38-1.27-1.75-1.27-1.75-1.04-.73.08-.72.08-.72 1.15.08 1.76 1.22 1.76 1.22 1.02 1.8 2.68 1.28 3.33.98.1-.76.4-1.28.73-1.57-2.55-.3-5.23-1.32-5.23-5.88 0-1.3.44-2.36 1.16-3.2-.12-.3-.5-1.5.11-3.12 0 0 .95-.31 3.11 1.22a10.4 10.4 0 0 1 2.83-.39c.96 0 1.93.13 2.83.39 2.16-1.53 3.11-1.22 3.11-1.22.61 1.62.23 2.82.11 3.12.72.84 1.16 1.9 1.16 3.2 0 4.57-2.69 5.58-5.25 5.88.41.37.78 1.1.78 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.21.69.8.57 4.56-1.54 7.85-5.9 7.85-11.06C23.25 5.7 18.27.5 12 .5Z"
        />
      </svg>
    );
  }

  if (kind === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4.98 3.5C3.88 3.5 3 4.4 3 5.5S3.88 7.5 4.98 7.5C6.07 7.5 6.96 6.6 6.96 5.5S6.07 3.5 4.98 3.5ZM3.5 8.98H6.5V21H3.5V8.98ZM9 8.98h2.87v1.64h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.62 2.05 3.62 4.71V21h-3v-6.14c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.6-2.34 3.23V21H9V8.98Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
      />
    </svg>
  );
};

export const ContactCluster = () => {
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
      id="card-contacts"
      className="contact-cluster"
      style={{
        position: 'absolute',
        left: CONTACT_POS.left + drag.x,
        top: CONTACT_POS.top + drag.y,
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      aria-label="Contact cluster"
    >
      <div className="contact-cluster__label">Find me here ↓</div>
      <div className="contact-cluster__stack">
        {CONTACTS.map((c) => (
          <a
            key={c.label}
            className="contact-card"
            data-kind={c.icon}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            style={{
              left: c.x,
              top: c.y,
              ['--cc-rot']: `${c.rot}deg`,
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <Pin />
            <div className="contact-card__icon">
              <ContactIcon kind={c.icon} />
            </div>
            <div className="contact-card__name">{c.label}</div>
          </a>
        ))}
      </div>
    </section>
  );
};

