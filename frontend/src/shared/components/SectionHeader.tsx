import React from 'react';
import { Box, Typography } from '@mui/material';
import { AnimatedReveal } from './AnimatedReveal';
import { palette } from '../theme';

export interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

/**
 * Editorial section header
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, subtitle }) => {
  return (
    <AnimatedReveal direction="up">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: palette.terracotta,
              fontWeight: 500,
              fontSize: '0.875rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {number}
          </Typography>
          <Box
            component="span"
            sx={{
              mx: 2,
              color: palette.terracotta,
            }}
          >
            —
          </Box>
        </Box>
        
        <Typography
          variant="h2"
          sx={{
            color: palette.ink,
            mb: subtitle ? 2 : 0,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: palette.sage, // Using sage as a muted color
              maxWidth: 600,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </AnimatedReveal>
  );
};
