import { useRef, ReactElement, useEffect } from 'react';
import gsap from 'gsap';

export const Magnetic = ({ children }: { children: ReactElement }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 1, ease: 'power3.out' });
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      style={{ display: 'inline-block', position: 'relative' }}
      className="magnetic-wrapper"
    >
      {children}
    </div>
  );
};
