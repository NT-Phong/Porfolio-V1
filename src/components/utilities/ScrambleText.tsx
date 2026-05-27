import { useEffect, useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  speed?: number;
  delay?: number;
}

const CHARS = '!@#$%^&*()_+~`|}{[]:;?><,./-';

export default function ScrambleText({ text, speed = 40, delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);

  const startScramble = () => {
    let frame = 0;
    const totalFrames = text.length * 3; // Số frame chạy trước khi hoàn thành toàn bộ text
    
    const animate = () => {
      frame++;
      
      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          
          // Tiến trình hiển thị chữ cái từ trái sang phải
          const letterProgress = frame / totalFrames;
          const letterThreshold = index / text.length;
          
          if (letterProgress > letterThreshold) {
            return char;
          }
          
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
        
      setDisplayText(scrambled);
      
      if (frame < totalFrames) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startScramble();
    }, delay);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay]);

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      startScramble();
    }
  };

  return (
    <span 
      onMouseEnter={handleMouseEnter}
      className="cursor-default select-none inline-block will-change-contents"
    >
      {displayText}
    </span>
  );
}
