import { forwardRef, useEffect, useState } from 'react';

interface NeonTitleProps {
  text: string;
  as?: 'h1' | 'h2';
}

export const NeonTitle = forwardRef<HTMLHeadingElement, NeonTitleProps>(
  ({ text, as = 'h2' }, ref) => {
    const [flickering, setFlickering] = useState(false);

    useEffect(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      const interval = window.setInterval(() => {
        if (Math.random() < 0.55) {
          setFlickering(true);
          window.setTimeout(() => setFlickering(false), 420);
        }
      }, 5200);

      return () => window.clearInterval(interval);
    }, []);

    const words = text.toUpperCase().split(' ');
    let charIndex = 0;

    const HeadingTag = as;

    return (
      <HeadingTag
        ref={ref}
        tabIndex={-1}
        aria-label={text}
        className={`neon ${flickering ? 'flick' : ''}`}
      >
        {words.map((word, wi) => (
          <span key={`${word}-${wi}`}>
            <span className="w" aria-hidden="true">
              {[...word].map((ch, ci) => {
                const currentIdx = charIndex++;
                return (
                  <span
                    key={`${ch}-${ci}`}
                    className="l"
                    ref={(el) => el?.style.setProperty('--i', String(currentIdx))}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
            {wi < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </HeadingTag>
    );
  }
);

NeonTitle.displayName = 'NeonTitle';
