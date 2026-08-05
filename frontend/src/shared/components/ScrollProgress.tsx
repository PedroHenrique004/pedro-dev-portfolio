import React from 'react';
import { Box } from '@mui/material';
import { useScrollProgress } from '../hooks';
import { palette } from '../theme';

export interface ScrollProgressProps {
  orientation?: 'horizontal' | 'vertical';
  containerRef?: React.RefObject<HTMLElement>;
}

/**
 * Fixed progress indicator that fills as user scrolls
 */
export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  orientation = 'horizontal',
  containerRef,
}) => {
  const progress = useScrollProgress(containerRef);
  const percentage = `${progress * 100}%`;

  const isHorizontal = orientation === 'horizontal';

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 9999,
        backgroundColor: 'transparent',
        ...(isHorizontal
          ? {
              top: 0,
              left: 0,
              width: '100%',
              height: '3px',
            }
          : {
              top: 0,
              left: 0,
              width: '3px',
              height: '100%',
            }),
      }}
    >
      <Box
        sx={{
          backgroundColor: palette.terracotta,
          transition: 'width 0.1s ease-out, height 0.1s ease-out',
          ...(isHorizontal
            ? {
                height: '100%',
                width: percentage,
              }
            : {
                width: '100%',
                height: percentage,
              }),
        }}
      />
    </Box>
  );
};
