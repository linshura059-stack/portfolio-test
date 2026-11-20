import { useId } from 'react';
import { PORTFOLIO_PROFILE_PHOTO, ProjectScreenKey } from '../data/portfolioData';

export function SkillBrandIcon({ name }: { name: string }) {
  const rawId = useId();
  const gid = `sk-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  switch (name) {
    case 'HTML':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff8a3d" />
              <stop offset="1" stopColor="#f0371a" />
            </linearGradient>
          </defs>
          <path d="M4 3h16l-1.4 16L12 21l-6.6-2z" fill={`url(#${gid})`} />
          <path d="M12 5v14.4l5.2-1.5L18.4 5z" fill="#ffb347" fillOpacity=".55" />
          <text x="12" y="16" fontSize="9" fontWeight="800" textAnchor="middle" fill="#fff" fontFamily="Arial,sans-serif">
            5
          </text>
        </svg>
      );
    case 'CSS':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3db4ff" />
              <stop offset="1" stopColor="#1257d6" />
            </linearGradient>
          </defs>
          <path d="M4 3h16l-1.4 16L12 21l-6.6-2z" fill={`url(#${gid})`} />
          <path d="M12 5v14.4l5.2-1.5L18.4 5z" fill="#7fd6ff" fillOpacity=".5" />
          <text x="12" y="16" fontSize="9" fontWeight="800" textAnchor="middle" fill="#fff" fontFamily="Arial,sans-serif">
            3
          </text>
        </svg>
      );
    case 'Bootstrap':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#c26bff" />
              <stop offset="1" stopColor="#6a1fe6" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="4.5" fill={`url(#${gid})`} />
          <text x="12" y="17" fontSize="13" fontWeight="800" textAnchor="middle" fill="#fff" fontFamily="Arial,sans-serif">
            B
          </text>
        </svg>
      );
    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff04d" />
              <stop offset="1" stopColor="#ffc400" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="2" fill={`url(#${gid})`} />
          <text x="20.5" y="19.5" fontSize="9.5" fontWeight="800" textAnchor="end" fill="#1a1a1a" fontFamily="Arial,sans-serif">
            JS
          </text>
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7df9ff" />
              <stop offset="1" stopColor="#2d9bff" />
            </linearGradient>
          </defs>
          <g fill="none" stroke={`url(#${gid})`} strokeWidth="1.4">
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          </g>
          <circle cx="12" cy="12" r="2" fill="#7df9ff" />
        </svg>
      );
    case 'Vue':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <image href="/assets/vue-logo.png" x="1.5" y="3.5" width="21" height="17" preserveAspectRatio="xMidYMid meet" />
        </svg>
      );
    case 'PHP':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a9aeff" />
              <stop offset="1" stopColor="#5b5fd9" />
            </linearGradient>
          </defs>
          <ellipse cx="12" cy="12" rx="11" ry="6.5" fill={`url(#${gid})`} />
          <text
            x="12"
            y="14.8"
            fontSize="8"
            fontWeight="800"
            fontStyle="italic"
            textAnchor="middle"
            fill="#fff"
            fontFamily="Arial,sans-serif"
          >
            php
          </text>
        </svg>
      );
    case 'Laravel':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <image href="/assets/laravel-logo.png" x="2" y="2" width="20" height="20" preserveAspectRatio="xMidYMid meet" />
        </svg>
      );
    case 'MySQL':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <image href="/assets/mysql-logo.png" x="2" y="2" width="20" height="20" preserveAspectRatio="xMidYMid meet" />
        </svg>
      );
    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#c9a6ff" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#${gid})`}
            d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"
          />
        </svg>
      );
    case 'GitLab':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff9a4d" />
              <stop offset="1" stopColor="#e24329" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#${gid})`}
            d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z"
          />
        </svg>
      );
    case 'Vercel':
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#5ff0ff" />
            </linearGradient>
          </defs>
          <path
            d="M12 4l9 16H3z"
            fill={`url(#${gid})`}
            stroke={`url(#${gid})`}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function TechBadgeIcon({ name }: { name: string }) {
  const key = name.trim().toLowerCase();
  switch (key) {
    case 'laravel':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#ff2d20"
            d="M23.6 5.6 19 3a.6.6 0 0 0-.6 0l-4 2.3-.1.1V9L10.6 11V6.7l-.1-.1L6.4 4.2a.6.6 0 0 0-.6 0L1.2 6.8a.6.6 0 0 0-.3.5v10.2c0 .2.1.4.3.5l9.2 5.3a.6.6 0 0 0 .6 0l9.2-5.3 4-2.3a.6.6 0 0 0 .3-.5V6.1a.6.6 0 0 0-.9-.5zM6.1 5.3l3.2 1.8-3.2 1.9L2.9 7.1zM2.1 8.1 5.5 10v4.2l-3.4-2zm8 12.6L4 17.2V13l6.1 3.5zm.5-5.1-3.4-2V9.6l3.4 2zm8.2-6.8 3.2 1.8-3.2 1.9-3.2-1.8zM11 20.7v-4.1l6.1-3.5v4.1zm9.1-8.4-3.4 2V10l3.4-2z"
          />
        </svg>
      );
    case 'mysql':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <ellipse cx="12" cy="6" rx="8" ry="3" fill="#4aa3df" />
          <path fill="#2f7fb8" d="M4 6v5c0 1.7 3.6 3 8 3s8-1.3 8-3V6c0 1.7-3.6 3-8 3S4 7.7 4 6z" />
          <path fill="#1f5f8f" d="M4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5c0 1.7-3.6 3-8 3s-8-1.3-8-3z" />
        </svg>
      );
    case 'react.js':
      return (
        <svg viewBox="-12 -12 24 24" aria-hidden="true">
          <g fill="none" stroke="#61dafb" strokeWidth="1.2">
            <ellipse rx="10" ry="4" />
            <ellipse rx="10" ry="4" transform="rotate(60)" />
            <ellipse rx="10" ry="4" transform="rotate(120)" />
          </g>
          <circle r="1.8" fill="#61dafb" />
        </svg>
      );
    case 'html':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#e44d26" d="M3 2h18l-1.6 18L12 22l-7.4-2z" />
          <path fill="#fff" d="M7.5 8h9l-.2 2H9.7l.2 2h6.2l-.5 5-3.6 1-3.6-1-.2-3h2l.1 1.4 1.7.5 1.7-.5.2-2H7.9z" />
        </svg>
      );
    case 'css':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#1572b6" d="M3 2h18l-1.6 18L12 22l-7.4-2z" />
          <path fill="#fff" d="M7.5 8h9l-.2 2H9.7l.2 2h6.2l-.5 5-3.6 1-3.6-1-.2-3h2l.1 1.4 1.7.5 1.7-.5.2-2H7.9z" />
        </svg>
      );
    case 'typescript':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="22" height="22" x="1" y="1" rx="3" fill="#3178c6" />
          <text x="12" y="17.5" fontSize="11" fontWeight="800" textAnchor="middle" fill="#fff" fontFamily="Arial,sans-serif">
            TS
          </text>
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="22" height="22" x="1" y="1" rx="3" fill="#f7df1e" />
          <text x="12" y="17.5" fontSize="11" fontWeight="800" textAnchor="middle" fill="#222" fontFamily="Arial,sans-serif">
            JS
          </text>
        </svg>
      );
    case 'bootstrap 5':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="22" height="22" x="1" y="1" rx="5" fill="#7952b3" />
          <text x="12" y="17.5" fontSize="14" fontWeight="800" textAnchor="middle" fill="#fff" fontFamily="Arial,sans-serif">
            B
          </text>
        </svg>
      );
    case 'php':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777bb4" />
          <text x="12" y="15" fontSize="8.5" fontWeight="800" textAnchor="middle" fill="#fff" fontFamily="Arial,sans-serif">
            php
          </text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="22" height="22" x="1" y="1" rx="5" fill="#19e0d2" />
          <text x="12" y="16.5" fontSize="12" fontWeight="800" textAnchor="middle" fill="#021016" fontFamily="Arial,sans-serif">
            {name.trim().charAt(0).toUpperCase()}
          </text>
        </svg>
      );
  }
}

function Lines({
  x,
  y,
  w,
  n,
  fill = '#d3d9df',
  gap = 7,
  h = 3,
}: {
  x: number;
  y: number;
  w: number;
  n: number;
  fill?: string;
  gap?: number;
  h?: number;
}) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <rect
          key={i}
          x={x}
          y={y + i * gap}
          width={i === n - 1 ? w * 0.62 : w}
          height={h}
          rx={1.5}
          fill={fill}
        />
      ))}
    </>
  );
}

function PieChart({
  cx,
  cy,
  radius,
  segments,
}: {
  cx: number;
  cy: number;
  radius: number;
  segments: [number, string][];
}) {
  const r = radius / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <>
      {segments.map(([p, col], idx) => {
        const dashOffset = -offset * c;
        offset += p;
        return (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={col}
            strokeWidth={radius}
            strokeDasharray={`${c * p} ${c}`}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
      })}
    </>
  );
}

export function ProjectScreenSvg({ screen }: { screen: ProjectScreenKey }) {
  const rawId = useId();
  const clipId = `folioClip-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  if (screen === 'dashboard') {
    return (
      <svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <rect x="0" y="0" width="320" height="400" fill="#f3f5f9" />
        <rect x="0" y="0" width="58" height="400" fill="#fff" />
        <circle cx="29" cy="24" r="11" fill="#f2b632" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x="10" y={56 + i * 22} width="38" height="9" rx="3" fill={i === 0 ? '#3b82f6' : '#e8ebf0'} />
        ))}
        <text x="70" y="20" fontSize="11" fontWeight="700" fill="#2f80ed" fontFamily="Arial,Helvetica,sans-serif">
          Dashboard
        </text>
        {['#22c55e', '#ef4444', '#f59e0b', '#3b82f6'].map((c, i) => (
          <g key={c}>
            <rect x={70 + i * 61} y="30" width="55" height="36" rx="4" fill="#fff" />
            <rect x={76 + i * 61} y="38" width="20" height="4" rx="2" fill={c} />
            <rect x={76 + i * 61} y="48" width="34" height="7" rx="2" fill="#1f2937" />
          </g>
        ))}
        <rect x="70" y="76" width="140" height="104" rx="4" fill="#fff" />
        <rect x="78" y="84" width="48" height="5" rx="2" fill="#94a3b8" />
        {[30, 52, 40, 66, 48, 72, 58, 44].map((h, i) => (
          <rect key={i} x={80 + i * 16.5} y={172 - h} width="10" height={h} rx="2" fill={i % 2 ? '#93c5fd' : '#3b82f6'} />
        ))}
        <rect x="218" y="76" width="94" height="104" rx="4" fill="#fff" />
        <rect x="226" y="84" width="40" height="5" rx="2" fill="#94a3b8" />
        <PieChart cx={265} cy={140} radius={30} segments={[[0.42, '#3b82f6'], [0.26, '#ef4444'], [0.2, '#f59e0b'], [0.12, '#22c55e']]} />
        <rect x="70" y="190" width="242" height="96" rx="4" fill="#fff" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="80" y={200 + i * 17} width="222" height="9" rx="2" fill={i % 2 ? '#f6f7f9' : '#e9edf3'} />
        ))}
        <rect x="70" y="296" width="116" height="96" rx="4" fill="#fff" />
        <rect x="194" y="296" width="118" height="96" rx="4" fill="#fff" />
        <PieChart cx={253} cy={346} radius={26} segments={[[0.55, '#22c55e'], [0.3, '#3b82f6'], [0.15, '#f59e0b']]} />
        <Lines x={78} y={306} w={100} n={6} fill="#dfe4ea" gap={12} h={4} />
      </svg>
    );
  }

  if (screen === 'travel') {
    return (
      <svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <rect x="0" y="0" width="320" height="400" fill="#fff" />
        <rect x="0" y="0" width="320" height="24" fill="#fff" />
        <circle cx="16" cy="12" r="6" fill="#e0382f" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={120 + i * 36} y="10" width="26" height="4" rx="2" fill="#9aa4b2" />
        ))}
        <rect x="0" y="24" width="320" height="1" fill="#e5e7eb" />
        <path d="M28 52L74 40l44 10 14 34-14 20 10 34-36 22-30-10-22-28-20-26z" fill="#3b82c4" />
        <path d="M60 70l36-4 8 26-20 26-20-16z" fill="#5aa0de" />
        <Lines x={150} y={44} w={158} n={7} fill="#cfd6de" gap={10} h={4} />
        <rect x="150" y="126" width="70" height="14" rx="3" fill="#e0382f" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={14 + i * 102} y="176" width="94" height="64" rx="4" fill={['#7db7e8', '#f2b45a', '#84cba0'][i]} />
            <Lines x={18 + i * 102} y={250} w={86} n={3} fill="#d3d9df" gap={8} h={3} />
          </g>
        ))}
        <rect x="0" y="300" width="320" height="100" fill="#f4f6f9" />
        <Lines x={20} y={316} w={280} n={6} fill="#cbd2da" gap={12} h={4} />
      </svg>
    );
  }

  if (screen === 'shop') {
    return (
      <svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <rect x="0" y="0" width="320" height="400" fill="#f2f6f3" />
        <rect x="0" y="0" width="320" height="22" fill="#1e9e55" />
        <text x="12" y="15" fontSize="10" fontWeight="700" fill="#fff" fontFamily="Arial,Helvetica,sans-serif">
          iPhone
        </text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={140 + i * 38} y="9" width="26" height="4" rx="2" fill="#b8f0d0" />
        ))}
        <rect x="0" y="22" width="320" height="138" fill="#0b1912" />
        <rect x="14" y="34" width="292" height="114" fill="none" stroke="#22c55e" strokeWidth="3" />
        <text x="30" y="76" fontSize="20" fontWeight="700" fill="#fff" fontFamily="Arial,Helvetica,sans-serif">
          iPhone Shop
        </text>
        <text x="30" y="94" fontSize="7.5" fontWeight="400" fill="#86efac" fontFamily="Arial,Helvetica,sans-serif">
          WELCOME TO OUR WEBSITE
        </text>
        <rect x="30" y="108" width="58" height="14" rx="3" fill="#16a34a" />
        <rect x="210" y="44" width="58" height="96" rx="9" fill="#1f2933" />
        <rect x="214" y="48" width="50" height="88" rx="6" fill="#0f172a" />
        <circle cx="239" cy="92" r="14" fill="#e5e7eb" />
        {[0, 1, 2].map((i) => (
          <g key={`row1-${i}`}>
            <rect x={14 + i * 102} y="172" width="94" height="90" rx="4" fill="#fff" />
            <rect x={34 + i * 102} y="182" width="54" height="50" rx="4" fill="#e6f4ec" />
            <Lines x={22 + i * 102} y={244} w={60} n={2} fill="#cbd5d0" gap={8} h={3} />
          </g>
        ))}
        {[0, 1, 2].map((i) => (
          <g key={`row2-${i}`}>
            <rect x={14 + i * 102} y="272" width="94" height="90" rx="4" fill="#fff" />
            <rect x={34 + i * 102} y="282" width="54" height="50" rx="4" fill="#e6f4ec" />
            <Lines x={22 + i * 102} y={344} w={60} n={2} fill="#cbd5d0" gap={8} h={3} />
          </g>
        ))}
      </svg>
    );
  }

  if (screen === 'moto') {
    const renderBike = (x: number, y: number, color: string) => (
      <g transform={`translate(${x} ${y})`}>
        <circle cx="12" cy="30" r="10" fill="none" stroke="#1f2937" strokeWidth="3.5" />
        <circle cx="60" cy="30" r="10" fill="none" stroke="#1f2937" strokeWidth="3.5" />
        <path
          d="M12 30L30 10h20l10 20M30 10l8 20h22M50 10l5-8"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    );

    return (
      <svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <rect x="0" y="0" width="320" height="400" fill="#fff" />
        <circle cx="16" cy="13" r="8" fill="#1d4ed8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={120 + i * 34} y="11" width="22" height="4" rx="2" fill="#6b7280" />
        ))}
        <rect x="0" y="26" width="320" height="1" fill="#e5e7eb" />
        {renderBike(12, 50, '#111')}
        {renderBike(120, 50, '#0f5fd7')}
        {renderBike(228, 50, '#d13b2c')}
        {[0, 1, 2].map((i) => (
          <Lines key={i} x={14 + i * 104} y={100} w={86} n={3} fill="#d3d9df" gap={8} h={3} />
        ))}
        <rect x="0" y="140" width="320" height="120" fill="#f3f4f6" />
        <text x="160" y="172" fontSize="13" fontWeight="700" fill="#111827" textAnchor="middle" fontFamily="Arial,Helvetica,sans-serif">
          New arrivals
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={14 + i * 102} y="186" width="94" height="60" rx="4" fill="#fff" />
            {renderBike(20 + i * 102, 192, '#9ca3af')}
          </g>
        ))}
        <rect x="0" y="270" width="320" height="130" fill="#fff" />
        <Lines x={20} y={290} w={280} n={7} fill="#d3d9df" gap={12} h={4} />
      </svg>
    );
  }

  if (screen === 'folio') {
    return (
      <svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={clipId}>
            <circle cx="70" cy="124" r="34" />
          </clipPath>
        </defs>
        <rect x="0" y="0" width="320" height="400" fill="#14171c" />
        <rect x="0" y="0" width="320" height="24" fill="#1b1f26" />
        <text x="12" y="16" fontSize="9" fontWeight="700" fill="#fff" fontFamily="Arial,Helvetica,sans-serif">
          SOK SOPHEA
        </text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={190 + i * 32} y="10" width="22" height="4" rx="2" fill="#8b95a5" />
        ))}
        <text x="160" y="66" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial,Helvetica,sans-serif">
          I’M SOK SOPHEA WEB DEVELOPER
        </text>
        <circle cx="70" cy="124" r="34" fill="#3ba0f5" />
        <image
          href={PORTFOLIO_PROFILE_PHOTO}
          x="36"
          y="90"
          width="68"
          height="68"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />
        <circle cx="70" cy="124" r="34" fill="none" stroke="#3ba0f5" strokeWidth="1.5" />
        <text x="126" y="108" fontSize="11" fontWeight="700" fill="#fff" fontFamily="Arial,Helvetica,sans-serif">
          HELLO!
        </text>
        <Lines x={126} y={120} w={170} n={6} fill="#8b95a5" gap={10} h={4} />
        <rect x="0" y="196" width="320" height="204" fill="#0f1216" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={16 + i * 102} y="214" width="90" height="64" rx="5" fill="#1d2430" />
            <rect x={24 + i * 102} y="224" width="50" height="5" rx="2" fill="#3ba0f5" />
            <Lines x={24 + i * 102} y={238} w={72} n={3} fill="#44506a" gap={9} h={3} />
          </g>
        ))}
        <Lines x={16} y={300} w={288} n={5} fill="#3b4658" gap={12} h={4} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="320" height="400" fill="#fff" />
      <circle cx="16" cy="13" r="7" fill="#e8433f" />
      <rect x="34" y="10" width="40" height="6" rx="2" fill="#333" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={150 + i * 40} y="11" width="28" height="4" rx="2" fill="#8aa0b8" />
      ))}
      <rect x="0" y="26" width="320" height="3" fill="#22b8cf" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x="12"
            y={42 + i * 70}
            width="64"
            height="54"
            rx="3"
            fill={['#7cc5e8', '#f0b56a', '#9ad2a8', '#c9a7e8'][i]}
          />
          <rect x="84" y={44 + i * 70} width="150" height="6" rx="2" fill="#1d3557" />
          <Lines x={84} y={58 + i * 70} w={150} n={4} fill="#cfd6de" gap={9} h={3} />
        </g>
      ))}
      <rect x="246" y="42" width="64" height="210" rx="4" fill="#f1f5f9" />
      <Lines x={252} y={54} w={52} n={10} fill="#c7d0da" gap={16} h={4} />
    </svg>
  );
}
