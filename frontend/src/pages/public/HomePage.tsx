import { Box, Typography, Container } from '@mui/material';
import { ProfileHero } from '../../features/profile/components/ProfileHero';
import { ProfileAbout } from '../../features/profile/components/ProfileAbout';
import { ExperienceTimeline } from '../../features/experiences/components/ExperienceTimeline';
import { ProjectGrid } from '../../features/projects/components/ProjectGrid';
import { ToolsGrid } from '../../features/tools/components/ToolsGrid';
// import { TestimonialCarousel } from '../../features/testimonials/components/TestimonialCarousel';
import { CertificateList } from '../../features/certificates/components/CertificateList';
import { EditorialDivider, RainDivider, AnimatedReveal, SectionHeader } from '../../shared/components';
import { palette } from '../../shared/theme';
import { mockProfile } from '../../features/profile/data/mockProfile';

export const HomePage = () => {
  return (
    <Box id="home">
      <ProfileHero />
      
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 }, mx: 'auto' }}>
        <Box id="about" sx={{ py: { xs: 4, md: 6 } }}>
          <ProfileAbout />
        </Box>

        <Box id="experience" sx={{ py: { xs: 4, md: 6 } }}>
          <ExperienceTimeline />
        </Box>

        <Box id="projects" sx={{ py: { xs: 4, md: 6 } }}>
          <ProjectGrid />
        </Box>

        <Box id="tools" sx={{ py: { xs: 4, md: 6 } }}>
          <ToolsGrid />
        </Box>

        <Box id="certificates" sx={{ py: { xs: 4, md: 6 } }}>
          <CertificateList />
        </Box>

        {/*
        <Box id="testimonials" sx={{ py: { xs: 4, md: 6 } }}>
          <TestimonialCarousel />
        </Box>
        */}

        <Box id="contact" sx={{ py: { xs: 8, md: 12 } }}>
          <SectionHeader number="06" title="Contato" />
          <AnimatedReveal>
            <Box sx={{ mt: 6 }}>
              <Typography 
                sx={{ 
                  fontFamily: "'Instrument Serif', serif", 
                  fontStyle: 'italic',
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  color: palette.ink,
                  mb: 4
                }}
              >
                Vamos construir algo juntos?
              </Typography>
              <Typography 
                component="a" 
                href="mailto:contato@pedrosantos.com"
                sx={{ 
                  display: 'block',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  color: palette.terracotta,
                  textDecoration: 'none',
                  mb: 2,
                  '&:hover': {
                     textDecoration: 'underline'
                  }
                }}
              >
                hello@pedrosantos.com
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
                <Typography 
                  component="a" 
                  href="https://wa.me/5561985458497"
                  target="_blank"
                  sx={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '1.125rem',
                    color: palette.ink,
                    textDecoration: 'none',
                    '&:hover': { color: palette.terracotta }
                  }}
                >
                  WhatsApp
                </Typography>
                <Typography 
                  component="a" 
                  href={mockProfile?.linkedin_url || "#"}
                  target="_blank"
                  sx={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '1.125rem',
                    color: palette.ink,
                    textDecoration: 'none',
                    '&:hover': {
                       color: palette.terracotta
                    }
                  }}
                >
                  LinkedIn
                </Typography>
                <Typography 
                  component="a" 
                  href={mockProfile?.github_url || "#"}
                  target="_blank"
                  sx={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '1.125rem',
                    color: palette.ink,
                    textDecoration: 'none',
                    '&:hover': {
                       color: palette.terracotta
                    }
                  }}
                >
                  GitHub
                </Typography>
              </Box>
            </Box>
          </AnimatedReveal>
        </Box>
      </Container>
    </Box>
  );
};
