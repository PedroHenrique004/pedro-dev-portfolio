import React from 'react';
import { Box } from '@mui/material';
import { useIntersection } from '../hooks';

export interface AnimatedRevealProps {
  direction?: 'up' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

/**
 * Wrapper component for scroll-triggered reveal animations
 */
export const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  direction = 'up',
  delay = 0,
  duration = 600,
  children,
}) => {
  const { ref, isVisible } = useIntersection<HTMLDivElement>({ threshold: 0.1 });

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(30px)';
      case 'left':
        return 'translateX(-30px)';
      case 'right':
        return 'translateX(30px)';
      case 'fade':
      default:
        return 'none';
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? (direction !== 'fade' ? 'translate(0)' : 'none') : getTransform(),
        transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Box>
  );
};
