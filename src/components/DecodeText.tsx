import { useEffect, useState } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

export const DecodeText = ({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    const timeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(
          text.split('').map((letter, index) => {
            if (index < iteration) return letter;
            if (letter === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3.5; // Scramble speed
      }, 30);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
}
