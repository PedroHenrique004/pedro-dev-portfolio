import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { palette } from '../../../shared/theme';
import type { ProjectWithTools } from '../types';

interface ProjectCardProps {
  project: ProjectWithTools;
  variant: 'large' | 'small';
}

/**
 * Editorial Project Card
 * Supports asymmetric grid layouts with hover effects.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, variant }) => {
  const isLarge = variant === 'large';

  return (
    <Box
      component={Link}
      to={`/project/${project.slug || project.id}`}
      sx={{
        display: 'block',
        textDecoration: 'none',
        backgroundColor: palette.cream, // or sand
        border: `1px solid ${palette.sand}`,
        borderRadius: '2px',
        p: { xs: 3, md: 4 },
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: palette.terracotta,
          transform: 'translateY(-4px)',
          '& .hover-desc': {
            opacity: 1,
            maxHeight: '100px'
          }
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography
            variant="overline"
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: palette.sage,
              letterSpacing: '0.1em',
              display: 'block'
            }}
          >
            {project.category || 'Categoria'}
          </Typography>

          {project.image_url && (
            <Box
              component="img"
              src={project.image_url}
              alt={`${project.title} Icon`}
              sx={{
                width: 48,
                height: 48,
                borderRadius: '22%',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                objectFit: 'cover'
              }}
            />
          )}
        </Box>

        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontFamily: "'Instrument Serif', serif",
            color: palette.ink,
            fontSize: isLarge ? { xs: '2rem', md: '3rem' } : '1.8rem',
            mb: 2,
            lineHeight: 1.1
          }}
        >
          {project.title}
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: palette.ink,
              opacity: 0.8,
              lineHeight: 1.6,
              mb: 3
            }}
          >
            {project.short_description}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 'auto' }}>
          {/* Tools tag always visible */}
          <Box
            className="hover-tools"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              transition: 'all 0.3s ease'
            }}
          >
            {project.tools?.map((tool) => (
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
                  fontSize: '0.7rem'
                }}
              />
            ))}
          </Box>
          
          <Typography
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: palette.terracotta,
              fontWeight: 500,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              ml: 2
            }}
          >
            Ver projeto →
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
