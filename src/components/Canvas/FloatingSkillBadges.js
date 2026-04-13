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
    top: 320,
    rotate: -3,
    icon: faPostgresql,
  },
  {
    label: 'REST APIs',
    tooltip: 'Backend',
    left: 60,
    top: -380,
    rotate: 2,
    icon: faNodeJs,
  },
  {
    label: 'Git / CI-CD',
    tooltip: 'DevOps',
    left: 550,
    top: -200,
    rotate: -1.5,
    icon: faGithub,
  },
  {
    label: 'Agile / Scrum',
    tooltip: 'Process',
    left: -740,
    top: -240,
    rotate: 3,
    icon: faJira,
  },
  {
    label: 'Figma',
    tooltip: 'Design',
    left: -660,
    top: 20,
    rotate: -2,
    icon: faFigma,
  },
  {
    label: 'PWA',
    tooltip: 'Web Platform',
    left: 600,
    top: 260,
    rotate: 1.5,
    icon: faChrome,
  },
  {
    label: 'OAuth 2.0',
    tooltip: 'Auth',
    left: 480,
    top: 60,
    rotate: -2.5,
    icon: faOpenid,
  },
  {
    label: 'Web Push API',
    tooltip: 'Notifications',
    left: -500,
    top: 280,
    rotate: 1,
    icon: faFirefoxBrowser,
  },
  {
    label: 'React',
    tooltip: 'Frontend',
    left: 720,
    top: -40,
    rotate: 2.5,
    icon: faAtom,
  },
  {
    label: 'TypeScript',
    tooltip: 'DX',
    left: -160,
    top: -520,
    rotate: -2,
    icon: faIcons,
  },
  {
    label: 'Docker',
    tooltip: 'Containers',
    left: -860,
    top: 120,
    rotate: 2,
    icon: faDiagramPredecessor,
  },
  {
    label: 'Security',
    tooltip: 'Best practices',
    left: -350,
    top: -360,
    rotate: -1.5,
    icon: faFingerprint,
  },
  {
    label: 'Perf',
    tooltip: 'Optimization',
    left: 820,
    top: 180,
    rotate: -2,
    icon: faFireFlameSimple,
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
