import React from 'react';
import { Box, Typography } from '@mui/material';
import { AnimatedReveal, SectionHeader } from '../../../shared/components';
import { ProjectCard } from './ProjectCard';
import { useProjects } from '../../../shared/api/hooks';

/**
 * Editorial Project Grid
 * Asymmetric layout to present portfolio projects.
 */
export const ProjectGrid: React.FC = () => {
  const { data: projects, isLoading } = useProjects();
  const displayProjects = projects
    ? [...projects].sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return a.display_order - b.display_order;
      })
    : [];

  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4, lg: 8 }, py: 8 }}>
      <SectionHeader number="03" title="Projetos" />

      {isLoading ? (
        <Box sx={{ mt: 6 }}>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#1A1714', opacity: 0.6, fontSize: '1.1rem' }}>
            Carregando projetos...
          </Typography>
        </Box>
      ) : displayProjects.length === 0 ? (
        <Box sx={{ mt: 6 }}>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#1A1714', opacity: 0.6, fontSize: '1.1rem' }}>
            Novos projetos em breve.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}
        >
          {displayProjects.map((project, index) => (
            <AnimatedReveal key={project.id} delay={index * 50}>
              <ProjectCard project={project} variant="large" />
            </AnimatedReveal>
          ))}
        </Box>
      )}
    </Box>
  );
};
