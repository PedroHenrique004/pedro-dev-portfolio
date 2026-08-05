import React from 'react';
import { Box, Typography } from '@mui/material';
import { SectionHeader } from '../../../shared/components';
import { palette } from '../../../shared/theme';
import { ExperienceCard } from './ExperienceCard';
import { useExperiences } from '../../../shared/api/hooks';

/**
 * Editorial Experience Timeline
 * Left-aligned timeline with custom dots connecting editorial entries.
 */
export const ExperienceTimeline: React.FC = () => {
  const { data: experiences, isLoading } = useExperiences();
  const displayExperiences = experiences || [];

  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4, lg: 8 }, py: 8 }}>
      <SectionHeader number="02" title="Experiência" />

      {isLoading ? (
        <Box sx={{ mt: 6 }}>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.ink, opacity: 0.6, fontSize: '1.1rem' }}>
            Carregando experiências...
          </Typography>
        </Box>
      ) : displayExperiences.length === 0 ? (
        <Box sx={{ mt: 6 }}>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.ink, opacity: 0.6, fontSize: '1.1rem' }}>
            Ainda construindo a trajetória...
          </Typography>
        </Box>
      ) : (
        <Box sx={{ position: 'relative', mt: 6 }}>
        {/* Timeline Line (Desktop only) */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '1px',
            backgroundColor: palette.sand,
            display: { xs: 'none', md: 'block' }
          }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {displayExperiences.map((exp, index) => (
            <Box key={exp.id} sx={{ position: 'relative' }}>
              {/* Timeline Dot (Desktop only) */}
              <Box
                sx={{
                  position: 'absolute',
                  left: '-2px', // Centered on the 1px line
                  top: '12px', // Align roughly with the h3 title
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: palette.terracotta,
                  display: { xs: 'none', md: 'block' }
                }}
              />
              <ExperienceCard 
                experience={exp} 
                index={index} 
                isLast={index === displayExperiences.length - 1} 
              />
            </Box>
          ))}
        </Box>
      </Box>
      )}
    </Box>
  );
};
