import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { AnimatedReveal } from '../../../shared/components';
import { palette } from '../../../shared/theme';
import { useProfile } from '../../../shared/api/hooks';
import { TextSphere } from './TextSphere';

/**
 * Editorial Profile Hero Section
 * Left-aligned, non-centered layout with a subtle scroll indicator and rotated side text.
 */
export const ProfileHero: React.FC = () => {
  const { data: profile, isLoading } = useProfile();

  if (isLoading || !profile) return null;

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
        pt: '30vh',
        px: { xs: 2, md: 4, lg: 8 },
        boxSizing: 'border-box'
      }}
    >
      <Box sx={{ width: { xs: '100%', md: '60%' }, zIndex: 1 }}>
        <AnimatedReveal>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: { xs: '3rem', md: '5rem' },
              color: palette.ink,
              lineHeight: 1.1,
              mb: 2
            }}
          >
            {profile.full_name}
          </Typography>
        </AnimatedReveal>

        <AnimatedReveal delay={100}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: palette.terracotta,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              mb: 3
            }}
          >
            {profile.tagline}
          </Typography>
        </AnimatedReveal>

        <AnimatedReveal delay={200}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: palette.ink,
              opacity: 0.8,
              maxWidth: '500px',
              mb: 4,
              lineHeight: 1.6
            }}
          >
            {profile.short_bio}
          </Typography>
        </AnimatedReveal>

        <AnimatedReveal delay={300}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[
              { label: 'Email', href: `mailto:${profile.email}` },
              { label: 'LinkedIn', href: profile.linkedin_url || '#' },
              { label: 'GitHub', href: profile.github_url || '#' },
            ].map((link) => (
              <MuiLink
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                underline="none"
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: palette.ink,
                  position: 'relative',
                  cursor: 'pointer',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '1px',
                    bottom: 0,
                    left: 0,
                    backgroundColor: palette.terracotta,
                    transform: 'scaleX(0)',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.3s ease-out'
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left'
                  }
                }}
              >
                {link.label}
              </MuiLink>
            ))}
          </Box>
        </AnimatedReveal>
      </Box>

      {/* Right side interaction for visual balance */}
      <Box
        sx={{
          width: { xs: '0%', md: '40%' },
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 0,
        }}
      >
        <TextSphere />
      </Box>

    </Box>
  );
};
