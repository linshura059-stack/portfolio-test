import React, { useState, useEffect } from 'react';

interface NeonTitleProps {
  title: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  id?: string;
}

export const NeonTitle: React.FC<NeonTitleProps> = ({
  title,
  as: Tag = 'h2',
  className = '',
  id
}) => {
  const [flickering, setFlickering] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.55) {
        setFlickering(false);
        requestAnimationFrame(() => {
          setFlickering(true);
        });
      }
    }, 5200);

    return () => clearInterval(interval);
  }, []);

  const words = title.toUpperCase().split(' ');
  let letterIndex = 0;

  return (
    <Tag
      id={id}
      className={`neon ${flickering ? 'flick' : ''} ${className}`}
      aria-label={title}
      tabIndex={-1}
    >
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          <span className="w" aria-hidden="true">
            {Array.from(word).map((char, ci) => {
              const i = letterIndex++;
              return (
                <span
                  key={ci}
                  className="l"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {char}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Tag>
  );
};
