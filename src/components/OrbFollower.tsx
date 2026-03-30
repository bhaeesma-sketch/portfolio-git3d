import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const OrbFollower = () => {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    gsap.set(orbRef.current, { xPercent: -50, yPercent: -50, x: mouseX, y: mouseY });
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(orbRef.current, {
        x: mouseX,
        y: mouseY,
        duration: 3,
        ease: 'power3.out',
      });
    };
    
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div 
      ref={orbRef} 
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '800px', height: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0) 80%)',
        pointerEvents: 'none',
        zIndex: -1,
        filter: 'blur(100px)',
        mixBlendMode: 'screen',
        opacity: 0.8
      }}
    />
  );
}
