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
import './FloatingSkillBadges.css';

const BADGES = [
  {
    label: 'PostgreSQL',
    tooltip: 'Database',
    left: 1120,
    top: 820,
    rotate: -3,
    icon: faPostgresql,
  },
  {
    label: 'REST APIs',
    tooltip: 'Backend',
    left: 1260,
    top: 1380,
    rotate: 2,
    icon: faNodeJs,
  },
  {
    label: 'Git / CI-CD',
    tooltip: 'DevOps',
    left: 1050,
    top: 1200,
    rotate: -1.5,
    icon: faGithub,
  },
  {
    label: 'Agile / Scrum',
    tooltip: 'Process',
    left: 1740,
    top: 1240,
    rotate: 3,
    icon: faJira,
  },
  {
    label: 'Figma',
    tooltip: 'Design',
    left: 1660,
    top: 1520,
    rotate: -2,
    icon: faFigma,
  },
  {
    label: 'PWA',
    tooltip: 'Web Platform',
    left: 900,
    top: 1160,
    rotate: 1.5,
    icon: faChrome,
  },
  {
    label: 'OAuth 2.0',
    tooltip: 'Auth',
    left: 1980,
    top: 760,
    rotate: -2.5,
    icon: faOpenid,
  },
  {
    label: 'Web Push API',
    tooltip: 'Notifications',
    left: 2100,
    top: 1120,
    rotate: 1,
    icon: faFirefoxBrowser,
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
        <span className="float-badge-icon">
          <FontAwesomeIcon icon={b.icon} />
        </span>
        {b.label}
        <span className="tooltip-badge">{b.tooltip}</span>
      </div>
    ))}
  </div>
);
