import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// Hand Holding Pen SVG Icon
// Realistic illustrated hand holding a luxury gold fountain pen
// - Features an ink glow at the nib tip
// - Angled for realistic cursive writing cadence
// - Respects RTL (writing right-to-left) vs LTR (left-to-right)
// ============================================================================
interface HandHoldingPenProps {
  isRtl?: boolean;
  isWriting?: boolean;
  className?: string;
}

const HandHoldingPenComponent: React.FC<HandHoldingPenProps> = ({
  isRtl = true,
  isWriting = true,
  className = ''
}) => {
  return (
    <span
      className={`inline-block select-none pointer-events-none transition-transform duration-200 align-middle ${
        isWriting ? 'animate-pen-write' : 'opacity-0 scale-75 translate-y-2'
      } ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        position: 'relative',
        marginInlineStart: '2px',
        marginInlineEnd: '2px',
        verticalAlign: 'text-bottom',
        transformOrigin: isRtl ? 'bottom right' : 'bottom left',
        willChange: 'transform'
      }}
      aria-hidden="true"
    >
      <svg
        width="34"
        height="38"
        viewBox="0 0 64 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isRtl ? 'scale-x-[-1]' : ''}
        style={{ 
          overflow: 'visible',
          filter: 'drop-shadow(0 2px 5px rgba(245, 158, 11, 0.4))'
        }}
      >
        <defs>
          {/* Gold metallic gradient for pen body & nib */}
          <linearGradient id="goldNibGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* Premium dark barrel gradient */}
          <linearGradient id="barrelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0B0F19" />
          </linearGradient>

          {/* Hand skin tone gradient */}
          <linearGradient id="handGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBD5B5" />
            <stop offset="50%" stopColor="#E8A87C" />
            <stop offset="100%" stopColor="#C38D64" />
          </linearGradient>
        </defs>

        {/* 1. Pen Body / Shaft */}
        <path
          d="M26 40 L50 8 L58 14 L34 46 Z"
          fill="url(#barrelGradient)"
          stroke="#475569"
          strokeWidth="1"
        />

        {/* Pen Gold Band */}
        <polygon
          points="32,44 36,47 38,44 34,41"
          fill="url(#goldNibGradient)"
        />

        {/* 2. Luxury Fountain Pen Gold Nib (سن القلم) */}
        <path
          d="M26 40 L16 54 L14 58 L18 57 L34 46 Z"
          fill="url(#goldNibGradient)"
          stroke="#D97706"
          strokeWidth="0.8"
        />
        {/* Nib slit */}
        <line
          x1="14"
          y1="58"
          x2="24"
          y2="47"
          stroke="#78350F"
          strokeWidth="0.8"
        />

        {/* 3. Illustrated Hand Fingers Gripping the Pen */}
        {/* Thumb & Forefinger contours */}
        <path
          d="M36 34 C36 30, 42 28, 48 32 C54 36, 56 42, 54 48 C50 54, 42 56, 36 50 C33 46, 33 40, 36 34 Z"
          fill="url(#handGradient)"
          stroke="#9A6B4A"
          strokeWidth="1.2"
        />

        {/* Finger crease & knuckle definition */}
        <path
          d="M40 33 C44 32, 48 35, 50 39"
          stroke="#A76F4B"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M38 42 C41 44, 46 45, 49 43"
          stroke="#A76F4B"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Middle finger peek underneath */}
        <path
          d="M32 46 C29 48, 28 52, 30 55 C32 58, 38 58, 42 54"
          fill="#D4936B"
          stroke="#9A6B4A"
          strokeWidth="1"
        />

        {/* Cuff / Sleeve */}
        <path
          d="M48 44 L60 36 L64 42 L52 52 Z"
          fill="#1E293B"
          stroke="#334155"
          strokeWidth="1"
        />
        {/* Golden cufflink */}
        <circle cx="56" cy="45" r="2" fill="url(#goldNibGradient)" />

        {/* 4. Glowing Liquid Gold Ink Dot at Nib Contact Point */}
        <circle
          cx="14"
          cy="58"
          r="4.5"
          fill="#F59E0B"
          opacity="0.75"
          className="animate-pulse"
        />
        <circle
          cx="14"
          cy="58"
          r="2.2"
          fill="#FFFBEB"
        />
      </svg>
    </span>
  );
};

export const HandHoldingPen = React.memo(HandHoldingPenComponent);

// ============================================================================
// HandwrittenText Component
// Progressively writes out text with the realistic hand holding pen
// Triggers on scroll into viewport via IntersectionObserver
// ============================================================================
interface HandwrittenTextProps {
  text: string;
  speed?: number; // ms per letter
  delay?: number; // ms before writing starts
  className?: string;
  isRtl?: boolean;
  onComplete?: () => void;
  showPenAlways?: boolean;
}

export const HandwrittenText: React.FC<HandwrittenTextProps> = ({
  text,
  speed = 32,
  delay = 120,
  className = '',
  isRtl = true,
  onComplete
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Trigger writing when element enters screen viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // Animate the writing
  useEffect(() => {
    if (!isVisible) return;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    setDisplayedText('');
    setIsFinished(false);

    timeoutId = setTimeout(() => {
      setIsWriting(true);
      let currentIdx = 0;

      intervalId = setInterval(() => {
        currentIdx++;
        setDisplayedText(text.slice(0, currentIdx));

        if (currentIdx >= text.length) {
          clearInterval(intervalId);
          // Small delay before gracefully retiring the pen
          setTimeout(() => {
            setIsWriting(false);
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 350);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isVisible, text, speed, delay]);

  return (
    <span
      ref={containerRef}
      className={`inline-block relative ${className}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <span className={isFinished ? 'handwritten-glow-finish' : ''}>
        {displayedText}
      </span>

      {/* Hand holding pen that glides right at the cursor position */}
      {isWriting && (
        <HandHoldingPen isRtl={isRtl} isWriting={isWriting} />
      )}

      {/* Ink sparkle finish sweep */}
      {isFinished && (
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 opacity-80 animate-ping align-middle mx-1"
          title="Written"
        />
      )}
    </span>
  );
};

// ============================================================================
// HandwrittenHeading Component
// Specifically for prominent section titles (H1, H2, H3, H4)
// ============================================================================
interface HandwrittenHeadingProps {
  title: string;
  subtitle?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  className?: string;
  subtitleClassName?: string;
  isRtl?: boolean;
  speed?: number;
  delay?: number;
}

export const HandwrittenHeading: React.FC<HandwrittenHeadingProps> = ({
  title,
  subtitle,
  as: Tag = 'h2',
  className = '',
  subtitleClassName = 'text-slate-400 text-sm md:text-base mt-2 max-w-2xl mx-auto',
  isRtl = true,
  speed = 28,
  delay = 100
}) => {
  const [titleDone, setTitleDone] = useState(false);

  return (
    <div className="relative my-2">
      <Tag className={className}>
        <HandwrittenText
          text={title}
          isRtl={isRtl}
          speed={speed}
          delay={delay}
          onComplete={() => setTitleDone(true)}
        />
      </Tag>

      {subtitle && (
        <div className={subtitleClassName}>
          {titleDone ? (
            <HandwrittenText
              text={subtitle}
              isRtl={isRtl}
              speed={speed * 0.75}
              delay={150}
            />
          ) : (
            <span className="opacity-0 select-none">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
};
