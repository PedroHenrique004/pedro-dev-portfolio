import React from 'react';
import { Box } from '@mui/material';
import { palette } from '../theme';

export interface EditorialDividerProps {
  width?: string;
}

/**
 * A styled editorial divider with a terracotta square accent
 */
export const EditorialDivider: React.FC<EditorialDividerProps> = ({ width = '65%' }) => {
  return (
    <Box
      sx={{
        width,
        height: '1px',
        backgroundColor: palette.sand,
        my: 4,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Box
        sx={{
          width: '6px',
          height: '6px',
          backgroundColor: palette.terracotta,
          position: 'absolute',
          right: 0,
        }}
      />
    </Box>
  );
};
