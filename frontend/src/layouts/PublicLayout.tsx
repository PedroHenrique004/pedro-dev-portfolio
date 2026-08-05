import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Drawer, List, ListItem } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const palette = {
  ink: '#1A1714',
  cream: '#F5F0E8',
  terracotta: '#B8442A',
  sage: '#6B7B5E',
  sand: '#D9CCBA'
};

const navLinks = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#about' },
  { label: 'Experiência', href: '#experience' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Ferramentas', href: '#tools' },
  { label: 'Certificados', href: '#certificates' },
  // { label: 'Depoimentos', href: '#testimonials' },
  { label: 'Contato', href: '#contact' }
];

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2, md: 4 },
          backgroundColor: 'transparent',
          zIndex: 1000,
        }}
      >
        {/* Desktop Nav */}
        <Box 
          sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            gap: 1,
            backgroundColor: scrolled ? 'rgba(245,240,232,0.95)' : 'transparent',
            backdropFilter: scrolled ? 'blur(8px)' : 'none',
            border: scrolled ? `1px solid ${palette.sand}` : '1px solid transparent',
            padding: '8px 12px',
            borderRadius: '100px',
            transition: 'all 0.3s ease',
            boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none'
          }}
        >
          {navLinks.map((link) => (
            <RouterLink 
              key={link.label}
              to={location.pathname === '/' ? link.href : `/${link.href}`}
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  handleNavClick(link.href);
                }
              }}
              style={{ textDecoration: 'none' }}
            >
              <Typography
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: palette.ink,
                  px: 2,
                  py: 1,
                  borderRadius: '100px',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: palette.terracotta,
                    color: palette.cream,
                  },
                }}
              >
                {link.label}
              </Typography>
            </RouterLink>
          ))}
        </Box>

        {/* Mobile Nav Toggle */}
        <IconButton
          sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            position: 'absolute', 
            right: 16, 
            color: palette.ink
          }}
          disableRipple
          onClick={toggleDrawer}
          aria-label="menu"
        >
          {/* Custom hamburger lines */}
          <Box sx={{ width: 24, height: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
             <Box sx={{ height: 2, bgcolor: palette.ink, width: '100%' }} />
             <Box sx={{ height: 2, bgcolor: palette.ink, width: '100%' }} />
             <Box sx={{ height: 2, bgcolor: palette.ink, width: '100%' }} />
          </Box>
        </IconButton>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        slotProps={{
          paper: {
            sx: {
              width: '100%',
              backgroundColor: palette.cream,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: 16, right: 16, color: palette.ink }}
          onClick={toggleDrawer}
        >
           <Box sx={{ width: 24, height: 24, position: 'relative' }}>
               <Box sx={{ position: 'absolute', width: '100%', height: 2, bgcolor: palette.ink, top: '50%', transform: 'translateY(-50%) rotate(45deg)' }} />
               <Box sx={{ position: 'absolute', width: '100%', height: 2, bgcolor: palette.ink, top: '50%', transform: 'translateY(-50%) rotate(-45deg)' }} />
           </Box>
        </IconButton>
        <List sx={{ textAlign: 'center' }}>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding sx={{ mb: 4, justifyContent: 'center' }}>
              <RouterLink
                to={location.pathname === '/' ? link.href : `/${link.href}`}
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    handleNavClick(link.href);
                  } else {
                     setMobileOpen(false);
                  }
                }}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '1.5rem',
                    color: palette.ink,
                    '&:hover': {
                      color: palette.terracotta
                    }
                  }}
                >
                  {link.label}
                </Typography>
              </RouterLink>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, pt: 0 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: palette.ink,
          color: palette.cream,
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 4 }
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 4,
            mb: 6
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontFamily: "'Instrument Serif', serif", mb: 1 }}>
              Pedro Santos
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, fontFamily: "'DM Sans', sans-serif" }}>
              Desenvolvedor Mobile & Full Stack
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography
              component="a"
              href="mailto:pedrohenriqueph004@gmail.com"
              sx={{
                color: palette.cream,
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.875rem',
                '&:hover': {
                  color: palette.terracotta
                }
              }}
            >
              Email
            </Typography>
            <Typography
              component="a"
              href="https://www.linkedin.com/in/pedrosantos004"
              target="_blank"
              sx={{
                color: palette.cream,
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.875rem',
                '&:hover': {
                  color: palette.terracotta
                }
              }}
            >
              LinkedIn
            </Typography>
            <Typography
              component="a"
              href="https://github.com/PedroHenrique004"
              target="_blank"
              sx={{
                color: palette.cream,
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.875rem',
                '&:hover': {
                  color: palette.terracotta
                }
              }}
            >
              GitHub
            </Typography>
          </Box>
        </Box>
        <Box sx={{ height: '1px', backgroundColor: 'rgba(245,240,232,0.1)', mb: 3 }} />
        <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.5, fontFamily: "'DM Sans', sans-serif" }}>
          © 2026 Pedro Santos
        </Typography>
      </Box>
    </Box>
  );
};
