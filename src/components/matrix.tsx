import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
}

interface MatrixProps {
  onComplete: () => void;
}

const MatrixRain: React.FC<MatrixProps> = ({ onComplete }) => {
  const CHARS = useMemo(() => '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ'.split(''), []);
  const WIDTH = 150;
  const HEIGHT = 40;
  const COLUMN_SPACING = 2; // Space between columns
  const [drops, setDrops] = useState<Drop[]>([]);
  const [frame, setFrame] = useState<string>('');

  // Initialize drops with fixed columns
  useEffect(() => {
    const numColumns = Math.floor(WIDTH / COLUMN_SPACING);
    const initialDrops: Drop[] = Array.from({ length: numColumns }, (_, i) => ({
      x: i * COLUMN_SPACING, // Fixed x position
      y: Math.floor(Math.random() * HEIGHT) - HEIGHT,
      speed: 0.5 + Math.random() * 0.2,
      length: 7 + Math.floor(Math.random() * 10),
      chars: Array.from({ length: 20 }, () => CHARS[Math.floor(Math.random() * CHARS.length)])
    }));
    setDrops(initialDrops);
  }, []);

  // Update drops positions and characters
  const updateDrops = useCallback(() => {
    setDrops(prevDrops => 
      prevDrops.map(drop => {
        const newY = drop.y + drop.speed;
        
        // Reset drop to top when it goes off screen
        if (newY > HEIGHT + drop.length) {
          return {
            ...drop,
            y: -drop.length,
            x: drop.x, // Keep the same x position
            chars: Array.from({ length: drop.length }, () => 
              CHARS[Math.floor(Math.random() * CHARS.length)]
            )
          };
        }

        // Randomly change some characters
        const newChars = [...drop.chars];
        if (Math.random() < 0.1) {
          const idx = Math.floor(Math.random() * drop.chars.length);
          newChars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        return {
          ...drop,
          y: newY,
          chars: newChars
        };
      })
    );
  }, [CHARS]);

  // Render frame
  const renderFrame = useCallback(() => {
    const screen = Array.from({ length: HEIGHT }, () => 
      Array.from({ length: WIDTH }, () => ' ')
    );

    drops.forEach(drop => {
      const startY = Math.floor(drop.y);
      const x = Math.floor(drop.x);

      for (let i = 0; i < drop.length; i++) {
        const y = startY - i;
        if (y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH) {
          const intensity = 1 - i / drop.length;
          let char = drop.chars[i] || CHARS[Math.floor(Math.random() * CHARS.length)];
          
          // Add color intensity classes
          if (intensity > 0.8) {
            char = `<span class="text-dark-green brightness-200">${char}</span>`;
          } else if (intensity > 0.5) {
            char = `<span class="text-dark-green brightness-150">${char}</span>`;
          } else if (intensity > 0.3) {
            char = `<span class="text-dark-green brightness-100">${char}</span>`;
          } else {
            char = `<span class="text-dark-green brightness-75">${char}</span>`;
          }
          
          screen[y][x] = char;
        }
      }
    });

    return screen.map(row => row.join('')).join('\n');
  }, [drops, CHARS]);

  // Animation loop
  useEffect(() => {
    let animationId: number;
    let lastRender = 0;
    const FPS = 60;
    const frameDelay = 1000 / FPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastRender >= frameDelay) {
        updateDrops();
        setFrame(renderFrame());
        lastRender = currentTime;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();
      cancelAnimationFrame(animationId);
      onComplete();
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [updateDrops, renderFrame]);

  return (
    <div className="fixed inset-0 bg-dark-background z-50 flex items-center justify-center overflow-hidden">
      <pre 
        className="text-xs leading-none"
        dangerouslySetInnerHTML={{ __html: frame }}
      />
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-dark-gray">
        Press any key to exit...
      </div>
    </div>
  );
};

export default MatrixRain; 