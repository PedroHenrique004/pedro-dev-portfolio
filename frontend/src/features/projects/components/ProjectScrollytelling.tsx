import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { AnimatedReveal } from '../../../shared/components';
import { palette } from '../../../shared/theme';
import type { ProjectCase } from '../types';

interface ProjectScrollytellingProps {
  projectCase: ProjectCase;
}

const useIntersection = (ref: React.RefObject<HTMLDivElement | null>, options: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return isIntersecting;
};

const PhaseSection: React.FC<{ phase: any; index: number; setActive: (idx: number) => void }> = ({ phase, index, setActive }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersection(ref, { threshold: 0.5 });

  useEffect(() => {
    if (isIntersecting) {
      setActive(index);
    }
  }, [isIntersecting, index, setActive]);

  return (
    <Box id={`phase-${index}`} ref={ref} sx={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', py: 4, mb: 8 }}>
      <AnimatedReveal>
        <Typography
          variant="overline"
          sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.terracotta, letterSpacing: '0.1em', mb: 2, display: 'block' }}
        >
          {phase.type || `Fase ${index + 1}`}
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{ fontFamily: "'Instrument Serif', serif", color: palette.ink, fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 4 }}
        >
          {phase.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.ink, opacity: 0.85, fontSize: '1.2rem', lineHeight: 1.8 }}
        >
          {phase.content}
        </Typography>
      </AnimatedReveal>
    </Box>
  );
};

/**
 * Editorial Scrollytelling for Project Case Studies
 */
export const ProjectScrollytelling: React.FC<ProjectScrollytellingProps> = ({ projectCase, project }) => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = projectCase.phases;

  return (
    <Box sx={{ width: '100%', px: { xs: 2, md: 4, lg: 8 }, py: 4 }}>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        {/* Left Sidebar Progress Indicator */}
        <Box
          sx={{
            width: { xs: '100%', md: '30%' },
            position: { xs: 'relative', md: 'sticky' },
            top: { xs: 'auto', md: '120px' },
            height: 'fit-content',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            mb: { xs: 6, md: 0 },
            pt: 4
          }}
        >
          {/* Progress Indicator (Oculto no mobile, e oculto se houver apenas 1 fase) */}
          {phases.length > 1 && (
            <Box sx={{ position: 'relative', pl: 2, display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'absolute', left: 2, top: 0, bottom: 0, width: '1px', backgroundColor: palette.sand }} />
              {phases.map((phase, idx) => (
                <Box 
                  key={idx} 
                  onClick={() => {
                    const el = document.getElementById(`phase-${idx}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 4, 
                    position: 'relative',
                    cursor: 'pointer',
                    '&:hover p': { color: palette.terracotta }
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '-4px', // 2px + line width offset
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: activePhase === idx ? palette.terracotta : 'transparent',
                      border: `1px solid ${activePhase === idx ? palette.terracotta : palette.sand}`,
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <Typography
                    sx={{
                      ml: 3,
                      fontFamily: "'DM Sans', sans-serif",
                      color: activePhase === idx ? palette.ink : palette.sage,
                      fontWeight: activePhase === idx ? 600 : 400,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {phase.type}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Right Content Area */}
        <Box sx={{ width: { xs: '100%', md: '70%' }, scrollBehavior: 'smooth' }}>
          {phases.map((phase, idx) => (
            <PhaseSection key={idx} phase={phase} index={idx} setActive={setActivePhase} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
