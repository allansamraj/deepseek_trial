import { useState, useEffect } from 'react';

export default function KnowledgeHealthScore({ score, size = 140 }) {
  const center = size / 2;
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference * (1 - score / 100));
    }, 300);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  const getColor = () => {
    if (score >= 80) return '#FF6500';
    if (score >= 60) return '#1E3E62';
    return '#E03E00';
  };

  const gradientId = `healthGradient-${score}`;

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6500" />
            <stop offset="100%" stopColor="#1E3E62" />
          </linearGradient>
        </defs>

        {/* Track circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#06101E"
          strokeWidth={8}
          fill="none"
        />

        {/* Progress circle */}
        <g style={{ transform: 'rotate(-90deg)', transformOrigin: `${center}px ${center}px` }}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={8}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </g>

        {/* Center text */}
        <text
          x={center}
          y={center - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fill: 'white', fontSize: '28px', fontWeight: 700, fontFamily: 'Sora, sans-serif' }}
        >
          {score}
          <tspan style={{ fontSize: '14px', fill: '#A1A1AA' }}>%</tspan>
        </text>
        <text
          x={center}
          y={center + 18}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fill: getColor(), fontSize: '12px', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Health
        </text>
      </svg>
    </div>
  );
}
