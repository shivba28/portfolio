import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Clouds } from './Bg-Animations/Clouds';
import { Stars } from './Bg-Animations/Stars';
import progImg from '../assets/Images/lang.png';
import frameImg from '../assets/Images/framework.png';
import techImg from '../assets/Images/tech.png';
import testImg from '../assets/Images/test.png';
import '../assets/CSS/skills.css';
import './SkillCards.css';

/** World-space layouts by viewport (drag offsets still apply on top). */
const SKILL_LAYOUTS = {
  wide: {
    cluster: { left: -500, top: 300 },
    positions: [
      { id: 'card1', x: 100, y: 0 },
      { id: 'card2', x: 450, y: 0 },
      { id: 'card3', x: 800, y: 0 },
      { id: 'card4', x: -250, y: 0 },
    ],
  },
  medium: {
    cluster: { left: -420, top: 340 },
    positions: [
      { id: 'card1', x: 0, y: 0 },
      { id: 'card2', x: 280, y: 0 },
      { id: 'card3', x: 560, y: 0 },
      { id: 'card4', x: -260, y: 0 },
    ],
  },
  narrow: {
    cluster: { left: -140, top: 520 },
    positions: [
      { id: 'card1', x: 0, y: 0 },
      { id: 'card2', x: 0, y: 400 },
      { id: 'card3', x: 0, y: 800 },
      { id: 'card4', x: 0, y: 1200 },
    ],
  },
};

function useSkillCardsLayout() {
  const [layout, setLayout] = useState('wide');

  useEffect(() => {
    const mqNarrow = window.matchMedia('(max-width: 640px)');
    const mqMedium = window.matchMedia('(max-width: 1024px)');

    const pick = () => {
      if (mqNarrow.matches) setLayout('narrow');
      else if (mqMedium.matches) setLayout('medium');
      else setLayout('wide');
    };

    pick();
    mqNarrow.addEventListener('change', pick);
    mqMedium.addEventListener('change', pick);
    return () => {
      mqNarrow.removeEventListener('change', pick);
      mqMedium.removeEventListener('change', pick);
    };
  }, []);

  return layout;
}

const CARD_DATA = [
  {
    id: 'card1',
    title: 'Languages',
    img: progImg,
    imgAlt: 'languages',
    items: [
      'Python',
      'C#',
      'Javascript/Typescript',
      'HTML/CSS',
      'PHP',
      'SQL',
      'Ruby',
    ],
  },
  {
    id: 'card2',
    title: 'Technologies',
    img: techImg,
    imgAlt: 'technologies',
    items: ['Docker', 'Kubernetes', 'SSIS', 'JIRA', 'AWS', 'Jenkins'],
  },
  {
    id: 'card3',
    title: 'Frameworks',
    img: frameImg,
    imgAlt: 'frameworks',
    items: [
      'ASP.NET',
      'VB.NET',
      'Flask/Django',
      'Next.js',
      'GraphQL',
      'React.js',
      'Angular',
    ],
  },
  {
    id: 'card4',
    title: 'Testing Tools',
    img: testImg,
    imgAlt: 'testing',
    items: [
      'Selenium',
      'Cypress',
      'Test Driven Dev',
      'OOP Concepts',
      'Machine Learning',
    ],
  },
];

export const SkillCards = () => {
  const layoutKey = useSkillCardsLayout();
  const { cluster: clusterPos, positions: layoutPositions } =
    SKILL_LAYOUTS[layoutKey];

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

  const handlePointerDown = useCallback((e, id) => {
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
  }, [dragById]);

  const handlePointerMove = useCallback((e) => {
    const { id } = dragRef.current;
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

  const handlePointerUp = useCallback((e) => {
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
      className={`skill-cards-cluster skill-cards-cluster--${layoutKey}`}
      style={{
        position: 'absolute',
        left: clusterPos.left,
        top: clusterPos.top,
      }}
    >
      {CARD_DATA.map((card) => {
        const pos =
          layoutPositions.find((p) => p.id === card.id) || { x: 0, y: 0 };
        const off = getOffset(card.id);
        return (
          <div
            key={card.id}
            className="skill-card skill-cards-canvas-card"
            id={card.id}
            style={{
              position: 'absolute',
              left: pos.x + off.x,
              top: pos.y + off.y,
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onPointerDown={(e) => handlePointerDown(e, card.id)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className="background">
              <Clouds />
              <Stars />
            </div>
            <h4 className="skill-card-title-badge">
              <img alt={card.imgAlt} src={card.img} loading="lazy" />
              {card.title}
            </h4>
            <div className="content">
              <div className="card-content">
                <ListGroup>
                  {card.items.map((label) => (
                    <ListGroup.Item key={label} data-cursor="block">
                      {label}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
