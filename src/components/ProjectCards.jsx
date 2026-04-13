import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import Lottie from 'lottie-react';
import '../assets/CSS/ProjectCards.css';

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

export const ProjectCards = () => {
  const [expandedId, setExpandedId] = useState(null);
  const cardRefs = useRef(new Map());

  const projects = useMemo(() => {
    const resolved = resolveProjects(projectsData);
    return [...resolved].sort((a, b) => parseDate(b.createdDate) - parseDate(a.createdDate));
  }, []);

  useEffect(() => {
    const draggables = [];

    projects.forEach((p) => {
      const el = cardRefs.current.get(p.id);
      if (!el) return;

      const draggable = Draggable.create(el, {
        type: 'x,y',
        bounds: { minX: -2200, maxX: 2200, minY: -2200, maxY: 2200 },
        inertia: false,
        cursor: 'grab',
        activeCursor: 'grabbing',
        onPress() {
          gsap.to(el, {
            scale: 1.03,
            duration: 0.18,
            ease: 'power2.out',
          });
        },
        onRelease() {
          gsap.to(el, {
            scale: 1,
            duration: 0.22,
            ease: 'power2.out',
          });
        },
      })[0];

      draggables.push(draggable);
    });

    return () => {
      draggables.forEach((d) => d.kill());
    };
  }, [projects]);

  return (
    <div className="project-cards-root" aria-label="Project cards">
      {projects.map((p, i) => {
        const { left, top, rotate } = getCardPos(p, i);
        const expanded = expandedId === p.id;

        return (
          <article
            key={p.id}
            id={`project-card-${toDomId(p.__assetKey) || p.id}`}
            ref={(node) => {
              if (!node) {
                cardRefs.current.delete(p.id);
                return;
              }
              cardRefs.current.set(p.id, node);
            }}
            className={`project-card${expanded ? ' project-card--expanded' : ''}`}
            style={{
              left,
              top,
              ['--pc-rot']: `${rotate}deg`,
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="project-card__hit"
              onClick={() => setExpandedId((cur) => (cur === p.id ? null : p.id))}
              aria-expanded={expanded}
            >
              <span className="sr-only">
                {expanded ? 'Collapse' : 'Expand'} {p.title}
              </span>
            </button>

            <div className="project-card__inner">
              <div className="about-card-tape" aria-hidden="true" />
              <header className="project-card__header">
                <div className="project-card__pin" aria-hidden="true" />
                <h3 className="project-card__title">{p.title}</h3>
                {p.createdDate ? (
                  <div className="project-card__meta">{p.createdDate}</div>
                ) : null}
              </header>

              <div className="project-card__hero" aria-hidden={false}>
                {p.type === 'video' ? (
                  <img className="project-card__img" src={p.video} alt={p.title} />
                ) : p.type === 'lottie-prop' ? (
                  <div className="project-card__lottieStack" aria-hidden="true">
                    <Lottie animationData={p.animationData} loop autoplay />
                    {p.animationData2 ? (
                      <Lottie
                        className="project-card__lottieProp"
                        animationData={p.animationData2}
                        loop
                        autoplay
                      />
                    ) : null}
                  </div>
                ) : (
                  <div className="project-card__lottie" aria-hidden="true">
                    <Lottie animationData={p.animationData} loop autoplay />
                  </div>
                )}
              </div>

              <div className="project-card__body">
                <p className={`project-card__desc${expanded ? ' is-expanded' : ''}`}>
                  {expanded ? p.Desc : clampText(p.Desc, 170)}
                </p>
              </div>

              <footer className="project-card__footer">
                <a
                  className="project-card__btn"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  onPointerDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  GitHub
                </a>
                {p.demo ? (
                  <a
                    className="project-card__btn project-card__btn--demo"
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    onPointerDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                  >
                    Live
                  </a>
                ) : null}
                <button
                  type="button"
                  className="project-card__btn project-card__btn--more"
                  onClick={() => setExpandedId((cur) => (cur === p.id ? null : p.id))}
                >
                  {expanded ? 'Less' : 'More'}
                </button>
              </footer>
            </div>
          </article>
        );
      })}
    </div>
  );
};

