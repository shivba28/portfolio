import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPostgresql,
  faNodeJs,
  faGithub,
  faJira,
  faFigma,
  faChrome,
  faOpenid,
  faFirefoxBrowser,
} from '@fortawesome/free-brands-svg-icons';
import {
  faAtom,
  faFingerprint,
  faIcons,
  faDiagramPredecessor,
  faFireFlameSimple,
} from '@fortawesome/free-solid-svg-icons';
import './FloatingSkillBadges.css';

const BADGES = [
  {
    label: 'PostgreSQL',
    tooltip: 'Database',
    left: 20,
    top: 220,
    rotate: -3,
    icon: faPostgresql,
    bg: 'var(--badge-pop-5)',
  },
  {
    label: 'REST APIs',
    tooltip: 'Backend',
    left: 60,
    top: -380,
    rotate: 2,
    icon: faNodeJs,
    bg: 'var(--badge-pop-2)',
  },
  {
    label: 'Git / CI-CD',
    tooltip: 'DevOps',
    left: 550,
    top: -200,
    rotate: -1.5,
    icon: faGithub,
    bg: 'var(--badge-pop-1)',
  },
  {
    label: 'Agile / Scrum',
    tooltip: 'Process',
    left: -640,
    top: -240,
    rotate: 3,
    icon: faJira,
    bg: 'var(--badge-pop-6)',
  },
  {
    label: 'Figma',
    tooltip: 'Design',
    left: -660,
    top: 20,
    rotate: -2,
    icon: faFigma,
    bg: 'var(--badge-pop-4)',
  },
  {
    label: 'PWA',
    tooltip: 'Web Platform',
    left: 300,
    top: 0,
    rotate: 1.5,
    icon: faChrome,
    bg: 'var(--badge-pop-3)',
  },
  {
    label: 'OAuth 2.0',
    tooltip: 'Auth',
    left: 480,
    top: 60,
    rotate: -2.5,
    icon: faOpenid,
    bg: 'var(--badge-pop-5)',
  },
  {
    label: 'Web Push API',
    tooltip: 'Notifications',
    left: -500,
    top: 180,
    rotate: 1,
    icon: faFirefoxBrowser,
    bg: 'var(--badge-pop-2)',
  },
  {
    label: 'React',
    tooltip: 'Frontend',
    left: 720,
    top: -40,
    rotate: 2.5,
    icon: faAtom,
    bg: 'var(--badge-pop-4)',
  },
  {
    label: 'TypeScript',
    tooltip: 'DX',
    left: -160,
    top: -520,
    rotate: -2,
    icon: faIcons,
    bg: 'var(--badge-pop-1)',
  },
  {
    label: 'Docker',
    tooltip: 'Containers',
    left: -460,
    top: -120,
    rotate: 2,
    icon: faDiagramPredecessor,
    bg: 'var(--badge-pop-6)',
  },
  {
    label: 'Security',
    tooltip: 'Best practices',
    left: -350,
    top: -360,
    rotate: -1.5,
    icon: faFingerprint,
    bg: 'var(--badge-pop-3)',
  },
  {
    label: 'Perf',
    tooltip: 'Optimization',
    left: 320,
    top: -180,
    rotate: -2,
    icon: faFireFlameSimple,
    bg: 'var(--badge-pop-2)',
  },
];

export const FloatingSkillBadges = () => (
  <div className="float-badges-root">
    {BADGES.map((b) => (
      <div
        key={b.label}
        className="float-badge"
        style={{
          left: b.left,
          top: b.top,
          transform: `rotate(${b.rotate}deg)`,
          background: b.bg,
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <span className="float-badge-inner">
          <span className="float-badge-icon">
            <FontAwesomeIcon icon={b.icon} />
          </span>
          <span className="float-badge-text">{b.label}</span>
        </span>
        <span className="tooltip-badge">{b.tooltip}</span>
      </div>
    ))}
  </div>
);
