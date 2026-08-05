import React from 'react';
import { Box, Typography } from '@mui/material';
import { AnimatedReveal, SectionHeader } from '../../../shared/components';
import { palette } from '../../../shared/theme';
import { useProfile } from '../../../shared/api/hooks';

/**
 * Editorial About Section
 * Two-column asymmetric layout with a pull quote and key stats.
 */
export const ProfileAbout: React.FC = () => {
  const { data: profile, isLoading } = useProfile();

  if (isLoading || !profile) return null;

  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4, lg: 8 }, py: 8 }}>
      <SectionHeader number="01" title="Sobre" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 6, md: 8 },
          mt: 4,
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        {/* Left Column: Pull quote and stats (~40%) */}
        <Box sx={{ width: { xs: '100%', md: '40%' } }}>
          <AnimatedReveal>
            <Box
              sx={{
                borderLeft: `4px solid ${palette.terracotta}`,
                pl: 3,
                mb: 4
              }}
            >
              <Typography
                variant="h4"
                component="p"
                sx={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  color: palette.ink,
                  fontSize: { xs: '1.5rem', md: '1.8rem' },
                  lineHeight: 1.2
                }}
              >
                "Se você definir o problema corretamente, já terá metade da solução. — Steve Jobs"
              </Typography>
            </Box>
          </AnimatedReveal>


        </Box>

        {/* Right Column: Full about text (~55%) */}
        <Box sx={{ width: { xs: '100%', md: '55%' } }}>
          <AnimatedReveal delay={200}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                color: palette.ink,
                opacity: 0.85,
                lineHeight: 1.6,
                fontSize: '1rem',
                whiteSpace: 'pre-line'
              }}
            >
              {profile.about}
            </Typography>
          </AnimatedReveal>
        </Box>
      </Box>
    </Box>
  );
};
