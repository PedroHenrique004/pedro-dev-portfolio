import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { SectionHeader } from '../../../shared/components';
import { palette } from '../../../shared/theme';
import { useTestimonials } from '../../../shared/api/hooks';

/**
 * Editorial Testimonial Carousel
 * Manual carousel showing one testimonial at a time.
 */
export const TestimonialCarousel: React.FC = () => {
  const { data: testimonials, isLoading } = useTestimonials();
  const displayTestimonials = testimonials || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || displayTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, displayTestimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  if (isLoading) {
    return (
      <Box component="section" sx={{ px: { xs: 2, md: 4, lg: 8 }, py: 8 }}>
        <SectionHeader number="05" title="Depoimentos" />
        <Box sx={{ mt: 6 }}>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.ink, opacity: 0.6, fontSize: '1.1rem' }}>
            Carregando depoimentos...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (displayTestimonials.length === 0) {
    return (
      <Box component="section" sx={{ px: { xs: 2, md: 4, lg: 8 }, py: 8 }}>
        <SectionHeader number="05" title="Depoimentos" />
        <Box sx={{ mt: 6 }}>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.ink, opacity: 0.6, fontSize: '1.1rem' }}>
            Depoimentos a caminho...
          </Typography>
        </Box>
      </Box>
    );
  }

  const currentTestimonial = displayTestimonials[currentIndex];

  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4, lg: 8 }, py: 8 }}>
      <SectionHeader number="05" title="Depoimentos" />

      <Box
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        sx={{ mt: 6, position: 'relative', minHeight: '300px' }}
      >
        <Typography
          sx={{
            fontFamily: "'Instrument Serif', serif",
            color: palette.terracotta,
            fontSize: { xs: '4rem', md: '6rem' },
            opacity: 0.3,
            lineHeight: 0.5,
            mb: 2
          }}
        >
          "
        </Typography>

        <Box sx={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          {displayTestimonials.map((testimonial, idx) => (
            <Box
              key={testimonial.id}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: currentIndex === idx ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out',
                pointerEvents: currentIndex === idx ? 'auto' : 'none'
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  color: palette.ink,
                  fontSize: { xs: '1.5rem', md: '2.5rem' },
                  mb: 4,
                  maxWidth: '800px',
                  lineHeight: 1.3
                }}
              >
                {testimonial.message}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 'bold',
                  color: palette.ink
                }}
              >
                {testimonial.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: palette.sage
                }}
              >
                {testimonial.role} — {testimonial.company}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Controls */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 3,
            mt: 4
          }}
        >
          {/* Dots */}
          <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
            {displayTestimonials.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                sx={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: currentIndex === idx ? palette.terracotta : palette.sand,
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
          </Box>

          <Typography
            onClick={handlePrev}
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: palette.ink,
              cursor: 'pointer',
              userSelect: 'none',
              '&:hover': { color: palette.terracotta }
            }}
          >
            ←
          </Typography>
          <Typography
            onClick={handleNext}
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: palette.ink,
              cursor: 'pointer',
              userSelect: 'none',
              '&:hover': { color: palette.terracotta }
            }}
          >
            →
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
