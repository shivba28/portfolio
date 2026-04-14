import React, { useEffect, useMemo, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import Lottie from 'lottie-react';
import '../assets/CSS/ProjectCards.css';
import { useIsInView } from '../hooks/useIsInView';

import projectsData from '../assets/json/projects.json';

import constructionData from '../assets/Lottie/CCDP.json';
import pacman from '../assets/Lottie/pacman.gif';
import ans from '../assets/Lottie/ANS.json';
import valentines from '../assets/Lottie/Valentine.json';
import chatbot from '../assets/Lottie/Chatbot.json';
import videoGame from '../assets/Lottie/video-game.json';
import miniProjects from '../assets/Lottie/Mini-projects.json';
import portfolio from '../assets/Lottie/Portfolio.json';
import propChain1 from '../assets/Lottie/PropChain-1.json';
import propChain2 from '../assets/Lottie/PropChain-2.json';
import cardHeart from '../assets/Lottie/Card-Heart.json';
import foodservices from '../assets/Lottie/foodservices.json';
import rsvp from '../assets/Lottie/rsvp.json';
import secretSanta from '../assets/Lottie/secretSanta.json';
import umbracoBase from '../assets/Lottie/umbracoBase.json';
import voting from '../assets/Lottie/Voting.json';
import mealRoulette from '../assets/Lottie/mealRoulette.json';
import { PROJECT_CARD_POSITIONS } from './projectCardPositions';

const PRIORITY_IDS = [1, 6, 10];

const assetMap = {
  constructionData,
  ans,
  valentines,
  chatbot,
  portfolio,
  miniProjects,
  videoGame,
  propChain1,
  propChain2,
  pacman,
  foodservices,
  umbracoBase,
  voting,
  rsvp,
  secretSanta,
  cardHeart,
  mealRoulette,
};

const LOTTIE_IMPORTERS = {
  CCDP: () => import('../assets/Lottie/CCDP.json'),
  ANS: () => import('../assets/Lottie/ANS.json'),
  Valentine: () => import('../assets/Lottie/Valentine.json'),
  Chatbot: () => import('../assets/Lottie/Chatbot.json'),
  Portfolio: () => import('../assets/Lottie/Portfolio.json'),
  'Mini-projects': () => import('../assets/Lottie/Mini-projects.json'),
  'video-game': () => import('../assets/Lottie/video-game.json'),
  'PropChain-1': () => import('../assets/Lottie/PropChain-1.json'),
  'PropChain-2': () => import('../assets/Lottie/PropChain-2.json'),
  'Card-Heart': () => import('../assets/Lottie/Card-Heart.json'),
  foodservices: () => import('../assets/Lottie/foodservices.json'),
  rsvp: () => import('../assets/Lottie/rsvp.json'),
  secretSanta: () => import('../assets/Lottie/secretSanta.json'),
  umbracoBase: () => import('../assets/Lottie/umbracoBase.json'),
  Voting: () => import('../assets/Lottie/Voting.json'),
  mealRoulette: () => import('../assets/Lottie/mealRoulette.json'),
};

const resolveProjects = (data) =>
  data.map((p) => ({
    ...p,
    // Keep original JSON keys for stable DOM ids / manual overrides.
    __assetKey:
      p.type === 'video'
        ? p.video
        : p.type === 'lottie-prop'
          ? p.animationData2 || p.animationData
          : p.animationData,
    ...(p.animationData && { animationData: assetMap[p.animationData] }),
    ...(p.animationData2 && { animationData2: assetMap[p.animationData2] }),
    ...(p.video && { video: assetMap[p.video] }),
  }));

const toDomId = (s) =>
  String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const parseDate = (d) => {
  if (!d) return 0;
  const t = new Date(d).getTime();
  return Number.isFinite(t) ? t : 0;
};

const getCardPos = (p, i) => {
  const key = p?.__assetKey;
  const manual = key ? PROJECT_CARD_POSITIONS[key] : null;
  if (manual) return manual;

  // Fallback: small manual-friendly layout near center
  const COLS = 4;
  const CARD_X = 330;
  const CARD_Y = 380;
  const START_X = 360;
  const START_Y = -260;
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return {
    left: START_X + col * CARD_X,
    top: START_Y + row * CARD_Y,
    rotate: (i % 3 - 1) * 1.5,
  };
};

const clampText = (s, max = 160) => {
  const text = String(s || '').trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
};

gsap.registerPlugin(Draggable);

const ZOOM_COMPACT = 0.6;
const ZOOM_EXPANDED = 0.85;

// Deterministic "never repeats" (within practical ranges) pop colors per card.
// Golden-angle hue stepping spreads colors evenly without collisions.
const pcHue = (i) => (i * 137.508) % 360;

function useCanvasCameraRefs() {
  const zoomRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [, bump] = useState(0);
  const last = useRef({ x: 0, y: 0, z: 1 });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const world = document.querySelector('.canvas-world');
      if (world) {
        const tr = world.style.transform || '';
        // translate(px, px) scale(z)
        const m = tr.match(/translate\(([-0-9.]+)px,\s*([-0-9.]+)px\)\s*scale\(([-0-9.]+)\)/);
        if (m) {
          const x = parseFloat(m[1]) || 0;
          const y = parseFloat(m[2]) || 0;
          const z = parseFloat(m[3]) || 1;
          const changed = x !== last.current.x || y !== last.current.y || z !== last.current.z;
          if (changed) {
            last.current = { x, y, z };
            offsetRef.current = { x, y };
            zoomRef.current = z;
            bump((n) => (n + 1) % 1000000);
          }
        }
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return { zoomRef, offsetRef };
}

const ProjectCard = memo(function ProjectCard({
  p,
  i,
  zoomRef,
  offsetRef,
  forceExpanded,
  setForceExpandedId,
}) {
  const cardRef = useRef(null);
  const draggableRef = useRef(null);
  const { left, top, rotate } = getCardPos(p, i);
  const { inView, isNear } = useIsInView(cardRef, offsetRef, zoomRef);
  const zoom = zoomRef.current || 1;

  const compact = zoom < ZOOM_COMPACT && !forceExpanded;
  const expanded = zoom >= ZOOM_EXPANDED || forceExpanded;

  const [open, setOpen] = useState(false);

  const [loadedAssets, setLoadedAssets] = useState({});
  const shouldLazyLoad = isNear && !PRIORITY_IDS.includes(p.id);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return undefined;

    // Re-enable dragging (same plugin used by AboutCard).
    // Use transforms for drag so we don't mutate absolute left/top.
    draggableRef.current?.kill?.();
    const d = Draggable.create(el, {
      type: 'x,y',
      bounds: { minX: -2600, maxX: 2600, minY: -2600, maxY: 2600 },
      inertia: false,
      cursor: 'grab',
      activeCursor: 'grabbing',
      onPress(e) {
        e?.stopPropagation?.();
      },
      onDrag(e) {
        e?.stopPropagation?.();
      },
    })[0];

    draggableRef.current = d;
    return () => {
      d?.kill?.();
      draggableRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!shouldLazyLoad) return;
    if (loadedAssets[p.id]) return;

    const imp = LOTTIE_IMPORTERS[p.animationKey];
    if (!imp) return;

    let cancelled = false;
    imp().then((mod) => {
      if (cancelled) return;
      setLoadedAssets((prev) => ({ ...prev, [p.id]: mod.default }));
    });
    return () => {
      cancelled = true;
    };
  }, [shouldLazyLoad, loadedAssets, p.id, p.animationKey]);

  const resolvedAnim =
    PRIORITY_IDS.includes(p.id) || !p.animationKey
      ? p.animationData
      : loadedAssets[p.id] || null;

  const resolvedAnim2 =
    p.type === 'lottie-prop'
      ? PRIORITY_IDS.includes(p.id)
        ? p.animationData2
        : p.animationKey2 && loadedAssets[p.id]?.__secondary
      : null;

  return (
    <article
      ref={cardRef}
      id={`project-card-${toDomId(p.__assetKey) || p.id}`}
      className={[
        'project-card',
        compact ? 'project-card--compact' : '',
        expanded ? 'project-card--expanded' : '',
        open ? 'project-card--open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        left,
        top,
        ['--pc-rot']: `${rotate}deg`,
        // Pop background for the article surface (NOT the hero background).
        ['--pc-bg']: `hsl(${pcHue(i)} 92% 74%)`,
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {forceExpanded ? (
        <button
          type="button"
          className="project-card-close"
          onClick={(e) => {
            e.stopPropagation();
            setForceExpandedId(null);
          }}
          aria-label="Close"
        >
          ×
        </button>
      ) : null}

      <div className="about-card-tape project-card__tape" aria-hidden="true" />

      <button
        type="button"
        className="project-card__hit"
        onClick={() => {
          if (zoom < ZOOM_EXPANDED) {
            setForceExpandedId(p.id);
            setOpen(true);
            return;
          }
          setOpen((v) => !v);
        }}
        aria-expanded={open || forceExpanded}
      >
        <span className="sr-only">Open {p.title}</span>
      </button>

      <div className="project-card__inner">
        <header className="project-card__header">
          <div className="project-card__pin" aria-hidden="true" />
          <h3 className="project-card__title">{p.title}</h3>
        </header>

        <div className="project-card__hero" aria-hidden={false}>
          {p.type === 'video' ? (
            <img className="project-card__img" src={p.video} alt={p.title} />
          ) : isNear && resolvedAnim ? (
            p.type === 'lottie-prop' ? (
              <div className="project-card__lottieStack" aria-hidden="true">
                <Lottie animationData={resolvedAnim} loop autoplay={inView} />
                {p.animationData2 ? (
                  <Lottie
                    className="project-card__lottieProp"
                    animationData={p.animationData2}
                    loop
                    autoplay={inView}
                  />
                ) : null}
              </div>
            ) : (
              <div className="project-card__lottie" aria-hidden="true">
                <Lottie animationData={resolvedAnim} loop autoplay={inView} />
              </div>
            )
          ) : (
            <div className="lottie-placeholder" aria-hidden>
              <span className="lottie-placeholder-shimmer" />
            </div>
          )}
        </div>

        <div className="project-card__body project-card-desc">
          <p className={`project-card__desc${open || forceExpanded ? ' is-expanded' : ''}`}>
            {open || forceExpanded ? p.Desc : clampText(p.Desc, 170)}
          </p>
        </div>

        <footer className="project-card__footer project-card-actions">
          <a className="project-card__btn project-card__btn--primary" href={p.link} target="_blank" rel="noreferrer">
            GitHub
          </a>
          {p.demo ? (
            <a
              className="project-card__btn project-card__btn--demo project-card__btn--primary"
              href={p.demo}
              target="_blank"
              rel="noreferrer"
            >
              Live
            </a>
          ) : null}
          <button
            type="button"
            className="project-card__btn project-card__btn--more"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            {open ? 'Less' : 'More'}
          </button>
        </footer>
      </div>
    </article>
  );
});

export const ProjectCards = () => {
  const { zoomRef, offsetRef } = useCanvasCameraRefs();
  const [forceExpandedId, setForceExpandedId] = useState(null);
  const rootRef = useRef(null);

  const projects = useMemo(() => {
    const resolved = resolveProjects(projectsData);
    return [...resolved].sort((a, b) => parseDate(b.createdDate) - parseDate(a.createdDate));
  }, []);

  useEffect(() => {
    const onDocDown = (e) => {
      const root = rootRef.current;
      if (!root) return;
      if (root.contains(e.target)) return;
      setForceExpandedId(null);
    };
    document.addEventListener('pointerdown', onDocDown, true);
    return () => document.removeEventListener('pointerdown', onDocDown, true);
  }, []);

  return (
    <div ref={rootRef} className="project-cards-root" aria-label="Project cards">
      {projects.map((p, i) => (
        <ProjectCard
          key={p.id}
          p={p}
          i={i}
          zoomRef={zoomRef}
          offsetRef={offsetRef}
          forceExpanded={forceExpandedId === p.id}
          setForceExpandedId={setForceExpandedId}
        />
      ))}
    </div>
  );
};

