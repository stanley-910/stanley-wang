import React, { useState, useEffect, useCallback, useMemo } from 'react';

const FullScreenWaves = ({ onComplete }) => {
  const [frame, setFrame] = useState('');
  
  // Memoize constants
  const CHARS = useMemo(() => ' _abcöõö#$%123ABC', []);
  const WIDTH = 150; 
  const HEIGHT = 40;   

  // Memoize color selection
  const randomColor = useMemo(() => {
    const array = ['yellow', 'green', 'blue', 'red', 'purple'];
    return array[Math.floor(Math.random() * array.length)];
  }, []);

  // Optimize intensity calculation with useCallback
  const getIntensity = useCallback((row: number, col: number, time: number) => {
    const intensity = 
      0.7 * Math.sin(0.5 * row + time / 5) +
      3 * Math.sin(1.6 * col + time / 5) +
      Math.sin(10 * (col * Math.sin(time / 2) + row * Math.cos(time / 5)) + time / 2);

    const cyclicX = row + 0.5 * Math.sin(time / 2);
    const cyclicY = col + 0.5 * Math.cos(time / 4);
    
    return 17 * (0.5 + 0.499 * Math.sin(intensity)) * (0.7 + Math.sin(time) * 0.3);
  }, []);

  // Optimize frame generation with useCallback
  const generateFrame = useCallback((time: number) => {
    const rows = [];
    for (let row = 1; row < HEIGHT; row++) {
      let rowStr = '';
      for (let col = 1; col < WIDTH; col++) {
        const intensity = getIntensity(row / HEIGHT, col / WIDTH, time);
        const charIndex = Math.max(Math.min(Math.floor(intensity) - 1, CHARS.length - 1), 0);
        rowStr += CHARS[charIndex];
      }
      rows.push(rowStr);
    }
    return rows.join('\n');
  }, [CHARS, HEIGHT, WIDTH, getIntensity]);

  useEffect(() => {
    let animationId: number;
    let startTime = Date.now();
    let lastRender = 0;
    const FPS = 60; // Limit FPS
    const frameDelay = 1000 / FPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastRender >= frameDelay) {
        const time = (Date.now() - startTime) * 0.001;
        setFrame(generateFrame(time));
        lastRender = currentTime;
      }
      animationId = requestAnimationFrame(animate);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      cancelAnimationFrame(animationId);
      onComplete();
    };

    document.addEventListener('keypress', handleKeyPress);
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [generateFrame, onComplete]);

  return (
    <div className="crt-text fixed inset-0 bg-dark-background z-50 flex items-center justify-center">
      <pre className={`whitespace-pre text-dark-${randomColor} text-xs overflow-hidden`}>
        <div className="-translate-y-3">{frame}</div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-dark-gray">
          Press space to continue...
        </div>
      </pre>
    </div>
  );
};

export default React.memo(FullScreenWaves);
