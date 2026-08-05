import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { palette } from '../../../shared/theme';

const words = [
  'Swift', 'SwiftUI', 'UIKit', 'SwiftData', 'Core ML',
  'React', 'TypeScript', 'Material UI',
  'Python', 'FastAPI', 'SQLAlchemy', 'Docker',
  'PostgreSQL', 'Clean Architecture', 'MVVM', 
  'Princípios S.O.L.I.D.', 'TDD', 'Git', 'GitHub', 'Figma'
];

export const TextSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Radius of the sphere
    const radius = 200; 
    
    // Fibonacci sphere distribution
    const N = words.length;
    const phi = Math.PI * (3 - Math.sqrt(5));
    const points: { x: number; y: number; z: number }[] = [];
    
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      points.push({ x, y, z });
    }

    let rotationX = 0;
    let rotationY = 0;
    const speedX = 0.002;
    const speedY = 0.002;

    let animationFrameId: number;

    const render = () => {
      rotationX -= speedY;
      rotationY += speedX;

      const sinX = Math.sin(rotationX);
      const cosX = Math.cos(rotationX);
      const sinY = Math.sin(rotationY);
      const cosY = Math.cos(rotationY);

      points.forEach((point, i) => {
        // Rotate around X axis
        const y1 = point.y * cosX - point.z * sinX;
        const z1 = point.y * sinX + point.z * cosX;

        // Rotate around Y axis
        const x2 = point.x * cosY + z1 * sinY;
        const z2 = -point.x * sinY + z1 * cosY;

        // Project 3D to 2D
        // Perspective divide
        const perspective = 800;
        const scale = perspective / (perspective + z2 * radius);
        
        const x2d = x2 * radius * scale;
        const y2d = y1 * radius * scale;

        const el = itemsRef.current[i];
        if (el) {
          // Opacity based on z-depth
          const opacity = Math.max(0.1, Math.min(1, (z2 + 1) / 2 + 0.2));
          // Font size based on scale
          const size = Math.max(0.5, scale);
          
          el.style.transform = `translate3d(${x2d}px, ${y2d}px, 0) scale(${size})`;
          el.style.opacity = opacity.toString();
          el.style.zIndex = Math.floor(scale * 100).toString();
          
          // Add a subtle color shift for items closer to the front
          el.style.color = opacity > 0.8 ? palette.terracotta : palette.ink;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: { xs: '100%', md: '700px' },
        height: { xs: '400px', md: '700px' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '1000px',
        cursor: 'default',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${palette.sand} 0%, transparent 70%)`,
          opacity: 0.1,
          zIndex: -1
        }
      }}
    >
      {words.map((word, i) => (
        <Typography
          key={i}
          ref={(el: HTMLSpanElement | null) => itemsRef.current[i] = el}
          component="span"
          sx={{
            position: 'absolute',
            fontFamily: "'Instrument Serif', serif",
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            color: palette.ink,
            whiteSpace: 'nowrap',
            willChange: 'transform, opacity, color',
            pointerEvents: 'none',
            transition: 'color 0.3s ease'
          }}
        >
          {word}
        </Typography>
      ))}
    </Box>
  );
};
