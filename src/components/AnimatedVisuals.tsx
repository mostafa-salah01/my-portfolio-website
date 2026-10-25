import React, { useState, useEffect, useRef } from 'react';
import { HandHoldingPen, HandwrittenHeading, HandwrittenText } from './HandwrittenPenWriter';
export { HandHoldingPen, HandwrittenHeading, HandwrittenText };

// ============================================================================
// 1. Custom Hook: Intersection Observer for Scroll Reveals
// ============================================================================
export function useScrollIntersection(
  options: IntersectionObserverInit = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  triggerOnce = true
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (triggerOnce) {
          observer.unobserve(el);
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    }, options);

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options, triggerOnce]);

  return [elementRef, isVisible];
}

// ============================================================================
// 2. Typewriter Text Component with Realistic Hand & Pen Writing Effect
// Types text character-by-character when scrolled into view with animated pen
// ============================================================================
interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // initial delay before typing starts
  className?: string;
  cursorClassName?: string;
  startTrigger?: boolean;
  onComplete?: () => void;
  showCursor?: boolean;
  showPen?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 34,
  delay = 100,
  className = '',
  cursorClassName = 'typewriter-cursor',
  startTrigger = true,
  onComplete,
  showCursor = true,
  showPen = true
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const textRef = useRef(text);
  textRef.current = text;

  const isRtl = typeof document !== 'undefined' ? document.documentElement.dir === 'rtl' : true;

  useEffect(() => {
    if (!startTrigger) return;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    setDisplayedText('');
    setIsFinished(false);

    timeoutId = setTimeout(() => {
      setIsTyping(true);
      let currentIdx = 0;
      const targetText = textRef.current;

      intervalId = setInterval(() => {
        currentIdx++;
        setDisplayedText(targetText.slice(0, currentIdx));

        if (currentIdx >= targetText.length) {
          clearInterval(intervalId);
          setTimeout(() => {
            setIsTyping(false);
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 300);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, startTrigger, speed, delay]);

  return (
    <span className={`inline relative ${className} ${isFinished ? 'handwritten-glow-finish' : ''}`}>
      <span>{displayedText}</span>
      {/* Hand Holding Pen writing every letter with glowing nib */}
      {showPen && isTyping && (
        <HandHoldingPen isRtl={isRtl} isWriting={isTyping} />
      )}
      {/* Fallback cursor if pen is disabled */}
      {!showPen && showCursor && (!isFinished || isTyping) && (
        <span className={cursorClassName} aria-hidden="true" />
      )}
    </span>
  );
};

// ============================================================================
// 3. Scroll-Triggered Heading with Typewriter & Hand Pen
// Observes viewport and writes the headline live
// ============================================================================
interface TypewriterHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
  speed?: number;
  delay?: number;
  className?: string;
  startTrigger?: boolean;
  highlightWords?: string[];
  highlightClass?: string;
  onFinished?: () => void;
  showPen?: boolean;
}

export const TypewriterHeading: React.FC<TypewriterHeadingProps> = ({
  text,
  as: Component = 'h2',
  speed = 32,
  delay = 150,
  className = '',
  startTrigger,
  onFinished,
  showPen = true
}) => {
  const [containerRef, isVisible] = useScrollIntersection({ threshold: 0.15 });
  const shouldStart = startTrigger !== undefined ? (startTrigger && isVisible) || startTrigger : isVisible;

  return (
    <div ref={containerRef}>
      <Component className={className}>
        <TypewriterText
          text={text}
          speed={speed}
          delay={delay}
          startTrigger={shouldStart}
          onComplete={onFinished}
          showPen={showPen}
        />
      </Component>
    </div>
  );
};

// ============================================================================
// 4. Hero Cyclic Typewriter (Types, pauses, deletes, and switches phrases)
// ============================================================================
interface CyclicTypewriterProps {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export const CyclicTypewriter: React.FC<CyclicTypewriterProps> = ({
  phrases,
  typeSpeed = 45,
  deleteSpeed = 25,
  pauseDuration = 2400,
  className = ''
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (currentText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, typeSpeed);
      } else {
        // Finished typing, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length - 1));
        }, deleteSpeed);
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    <span className={`inline-flex items-center font-mono ${className}`}>
      <span>{currentText}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
};

// ============================================================================
// 5. Alternating Card Motion Wrapper
// Alternates entry:
//   - index % 3 === 0: slides in from right (translate-x)
//   - index % 3 === 1: slides in from left (-translate-x)
//   - index % 3 === 2: pops up from bottom with spring scale (translate-y)
// Staggers each card with individual sequential delay!
// ============================================================================
interface AlternatingCardRevealProps {
  index: number;
  isParentVisible: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  staggerDelayMs?: number;
}

export const AlternatingCardReveal: React.FC<AlternatingCardRevealProps> = ({
  index,
  isParentVisible,
  children,
  className = '',
  onClick,
  title,
  staggerDelayMs = 120
}) => {
  const [isRenderedVisible, setIsRenderedVisible] = useState(false);

  // Direction type: 0 = right, 1 = left, 2 = bottom/pop-up
  const directionMode = index % 3;

  useEffect(() => {
    if (!isParentVisible) return;

    // Staggered delay: card 0: 80ms, card 1: 80 + staggerDelayMs, etc.
    const staggerDelay = (index % 6) * staggerDelayMs + 80;
    const timer = setTimeout(() => {
      setIsRenderedVisible(true);
    }, staggerDelay);

    return () => clearTimeout(timer);
  }, [isParentVisible, index, staggerDelayMs]);

  // Determine hidden class based on alternating direction
  let hiddenClass = 'card-hidden-up';
  if (directionMode === 0) {
    hiddenClass = 'card-hidden-right';
  } else if (directionMode === 1) {
    hiddenClass = 'card-hidden-left';
  }

  const animationStateClass = isRenderedVisible ? 'card-visible' : hiddenClass;

  return (
    <div
      onClick={onClick}
      title={title}
      className={`card-entrance ${animationStateClass} ${className}`}
      style={{
        transitionDelay: `${(index % 3) * 60}ms`
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// 6. Ambient Floating Glow Background Orbs
// Creates cinematic depth with floating particles & laser gradients
// ============================================================================
export const AmbientBackgroundGlow: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* Top Gold Radial Light Orb */}
      <div 
        className="floating-tech-orb absolute -top-40 start-1/4 w-[550px] h-[550px] rounded-full blur-[140px] opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(220, 38, 38, 0.15) 50%, transparent 70%)' }}
      />

      {/* Middle Crimson Radial Light Orb */}
      <div 
        className="floating-tech-orb-reverse absolute top-1/3 end-10 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 70%)' }}
      />

      {/* Bottom Emerald/Cyan Ambient Light */}
      <div 
        className="floating-tech-orb absolute bottom-1/4 start-10 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)' }}
      />

      {/* Tech Grid Pattern Lines */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(245, 158, 11, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 158, 11, 0.3) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
};

// ============================================================================
// 7. Interactive Live Beacon Tag
// ============================================================================
export const LiveBeaconBadge: React.FC<{ textAr: string; textEn: string; isAr: boolean; variant?: 'emerald' | 'amber' | 'rose' }> = ({
  textAr,
  textEn,
  isAr,
  variant = 'emerald'
}) => {
  const colors = {
    emerald: 'bg-emerald-500/15 border-emerald-500/35 text-emerald-400',
    amber: 'bg-amber-500/15 border-amber-500/35 text-amber-300',
    rose: 'bg-rose-500/15 border-rose-500/35 text-rose-300'
  };

  const dotColors = {
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold shadow-sm ${colors[variant]}`}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant]}`} />
      </span>
      <span>{isAr ? textAr : textEn}</span>
    </div>
  );
};
