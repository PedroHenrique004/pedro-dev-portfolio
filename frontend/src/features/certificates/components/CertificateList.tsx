import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { AnimatedReveal, SectionHeader } from '../../../shared/components';
import { palette } from '../../../shared/theme';
import { useCertificates } from '../../../shared/api/hooks';

export const CertificateList: React.FC = () => {
  const { data: certificates, isLoading } = useCertificates();
  const displayCertificates = certificates || [];

  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4, lg: 8 }, py: 8 }}>
      <SectionHeader number="05" title="Certificações" />

      {isLoading ? (
        <Box sx={{ mt: 6 }}>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.ink, opacity: 0.6, fontSize: '1.1rem' }}>
            Carregando certificados...
          </Typography>
        </Box>
      ) : displayCertificates.length === 0 ? (
        <Box sx={{ mt: 6 }}>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.ink, opacity: 0.6, fontSize: '1.1rem' }}>
            Nenhum certificado registrado ainda.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Header Row */}
          <Box
            sx={{
              display: { xs: 'none', md: 'grid' },
              gridTemplateColumns: '1fr 3fr 2fr 1fr',
              borderBottom: `1px solid ${palette.sand}`,
              pb: 2,
              mb: 2,
            }}
          >
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: palette.sage, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Ano
            </Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: palette.sage, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Certificação
            </Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: palette.sage, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Emissor
            </Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: palette.sage, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>
              Link
            </Typography>
          </Box>

          {/* Certificate Items */}
          {displayCertificates.map((cert, index) => {
            const year = new Date(cert.issued_at).getFullYear();

            return (
              <AnimatedReveal key={cert.id} delay={index * 100}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 3fr 2fr 1fr' },
                    gap: { xs: 1, md: 0 },
                    py: 3,
                    borderBottom: `1px solid ${palette.sand}`,
                    alignItems: 'center',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(217, 204, 186, 0.2)', // Light sand hover
                    }
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: { xs: '1.2rem', md: '1.5rem' },
                      color: palette.terracotta,
                    }}
                  >
                    {year}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      color: palette.ink,
                    }}
                  >
                    {cert.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '1rem',
                      color: palette.ink,
                      opacity: 0.8,
                    }}
                  >
                    {cert.issued_by}
                  </Typography>

                  <Box sx={{ textAlign: { xs: 'left', md: 'right' }, mt: { xs: 2, md: 0 } }}>
                    {cert.image_url ? (
                      <MuiLink
                        href={cert.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.875rem',
                          color: palette.terracotta,
                          textDecoration: 'none',
                          borderBottom: `1px solid ${palette.terracotta}`,
                          pb: 0.5,
                          transition: 'opacity 0.2s',
                          '&:hover': {
                            opacity: 0.7,
                          }
                        }}
                      >
                        Ver credencial ↗
                      </MuiLink>
                    ) : (
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.875rem',
                          color: palette.sage,
                        }}
                      >
                        —
                      </Typography>
                    )}
                  </Box>
                </Box>
              </AnimatedReveal>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
