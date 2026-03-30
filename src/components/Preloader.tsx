import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './styles/Preloader.css';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        if (wrapRef.current) {
          const tl = gsap.timeline({ onComplete });
          tl.to('.preloader-percent', { opacity: 0, duration: 0.4, y: -20 });
          tl.to('.preloader-panel-left', { xPercent: -100, duration: 1, ease: 'power4.inOut' }, 'split');
          tl.to('.preloader-panel-right', { xPercent: 100, duration: 1, ease: 'power4.inOut' }, 'split');
          tl.set(wrapRef.current, { display: 'none' });
        }
      }
      setProgress(currentProgress);
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="preloader-wrap" ref={wrapRef}>
      <div className="preloader-panel preloader-panel-left" />
      <div className="preloader-panel preloader-panel-right" />
      <div className="preloader-content">
        <h2 className="preloader-percent">{progress}%</h2>
      </div>
    </div>
  );
};
