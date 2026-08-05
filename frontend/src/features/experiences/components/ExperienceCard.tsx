import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { AnimatedReveal } from '../../../shared/components';
import { palette } from '../../../shared/theme';
import type { ExperienceWithTools } from '../types';

interface ExperienceCardProps {
  experience: ExperienceWithTools;
  index: number;
  isLast: boolean;
}

const formatDate = (isoString: string | null): string => {
  if (!isoString) return 'Presente';
  const date = new Date(isoString);
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * Editorial Experience Card
 * Displays an experience entry without a typical card container.
 */
export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index, isLast }) => {
  const startDate = formatDate(experience.start_date);
  const endDate = formatDate(experience.end_date);

  return (
    <Box sx={{ position: 'relative', pb: isLast ? 0 : 8, pl: { xs: 0, md: 6 } }}>
      <AnimatedReveal delay={index * 100}>
        <Box>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontFamily: "'Instrument Serif', serif",
              color: palette.ink,
              fontSize: { xs: '1.8rem', md: '2rem' },
              mb: 0.5
            }}
          >
            {experience.company}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: palette.sage,
              fontSize: '1rem',
              mb: 1
            }}
          >
            {experience.role}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: palette.ink,
              opacity: 0.6,
              display: 'block',
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {startDate} — {endDate}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: palette.ink,
              opacity: 0.8,
              lineHeight: 1.6,
              mb: 2
            }}
          >
            {experience.description}
          </Typography>

          {experience.highlight && (
            <Box
              sx={{
                borderLeft: `2px solid ${palette.terracotta}`,
                pl: 2,
                mb: 3
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontStyle: 'italic',
                  color: palette.ink,
                  opacity: 0.9
                }}
              >
                {experience.highlight}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {experience.tools?.map((tool) => (
              <Chip
                key={tool.id}
                label={tool.name}
                variant="outlined"
                size="small"
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: palette.sage,
                  borderColor: palette.sage,
                  borderRadius: '4px',
                  opacity: 0.8
                }}
              />
            ))}
          </Box>
        </Box>
      </AnimatedReveal>
    </Box>
  );
};
