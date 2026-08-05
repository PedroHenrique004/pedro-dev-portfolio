import React from 'react';
import { Box } from '@mui/material';
import { palette } from '../theme';

export const RainDivider: React.FC = () => {
  return (
    <Box
      sx={{
        width: '1px',
        height: { xs: '150px', md: '200px' },
        backgroundColor: palette.sand,
        overflow: 'hidden',
        mx: 'auto', // Centered horizontally
        my: 0, // Removed vertical margins so it connects
        position: 'relative'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: palette.terracotta,
          animation: 'scrollDown 2s infinite',
          '@keyframes scrollDown': {
            '0%': { transform: 'translateY(-100%)' },
            '50%': { transform: 'translateY(100%)' },
            '100%': { transform: 'translateY(100%)' }
          }
        }}
      />
    </Box>
  );
};
