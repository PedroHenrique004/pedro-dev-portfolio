import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { ProjectScrollytelling } from '../../features/projects/components/ProjectScrollytelling';
import { ScrollProgress } from '../../shared/components';
import { palette } from '../../shared/theme';
import { useProjects } from '../../shared/api/hooks';
import type { ProjectCase, ProjectCasePhase } from '../../features/projects/types';

export const ProjectCasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: projects, isLoading } = useProjects();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: palette.cream }}>
        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.ink, opacity: 0.6, fontSize: '1.2rem' }}>
          Carregando projeto...
        </Typography>
      </Box>
    );
  }

  // Busca o projeto pelo slug (ou pelo id para retrocompatibilidade)
  const project = projects?.find(p => p.slug === slug || p.id === slug);

  if (!project) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: palette.cream }}>
        <Typography sx={{ fontFamily: "'Instrument Serif', serif", fontSize: '2rem', color: palette.ink, mb: 2 }}>
          Projeto não encontrado
        </Typography>
        <Typography component={Link} to="/" sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.terracotta, textDecoration: 'none' }}>
          ← Voltar para o início
        </Typography>
      </Box>
    );
  }

  // Parser inteligente para detectar o formato P.P.I. (Problema, Processo, Impacto)
  const parsePhases = (text: string | null): ProjectCasePhase[] => {
    if (!text) return [{ type: 'Visão Geral', title: 'Sobre o Projeto', content: 'Detalhes adicionais não disponíveis.' }];
    
    if (text.includes('Problema:') && text.includes('Processo:') && text.includes('Impacto:')) {
      const parts = text.split(/(Problema:|Processo:|Impacto:)/).filter(Boolean);
      const phases: ProjectCasePhase[] = [];
      
      for (let i = 0; i < parts.length; i += 2) {
        const typeRaw = parts[i].replace(':', '').trim();
        const content = parts[i + 1]?.trim() || '';
        if (typeRaw && content) {
          phases.push({
            type: typeRaw,
            title: typeRaw === 'Problema' ? 'O Desafio' : typeRaw === 'Processo' ? 'A Solução' : 'O Resultado',
            content
          });
        }
      }
      return phases;
    }
    return [{ type: 'Visão Geral', title: 'Sobre o Projeto', content: text }];
  };

  const fallbackCase: ProjectCase = {
    projectId: project.id,
    phases: parsePhases(project.full_description)
  };

  const currentIndex = projects!.findIndex(p => p.id === project.id);
  const nextProject = projects!.length > 1 ? projects![(currentIndex + 1) % projects!.length] : null;

  return (
    <Box sx={{ bgcolor: palette.cream, minHeight: '100vh', pt: '64px' }}>
      <ScrollProgress />
      
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
        <Typography 
          component={Link} 
          to="/#projects"
          sx={{ 
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.875rem',
            color: palette.ink,
            textDecoration: 'none',
            display: 'inline-block',
            mb: 6,
            '&:hover': {
              color: palette.terracotta
            }
          }}
        >
          ← Voltar ao menu
        </Typography>

        {/* Título e Ícone */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
          {project.image_url && (
            <Box
              component="img"
              src={project.image_url}
              alt={`${project.title} Icon`}
              sx={{
                width: { xs: 64, md: 96 },
                height: { xs: 64, md: 96 },
                borderRadius: '22%',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                objectFit: 'cover'
              }}
            />
          )}
          <Box>
            <Typography variant="h1" sx={{ fontFamily: "'Instrument Serif', serif", color: palette.ink, fontSize: { xs: '3rem', md: '5rem' }, mb: 1, lineHeight: 1 }}>
              {project.title}
            </Typography>
            {project.category && (
              <Typography variant="overline" sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.terracotta, letterSpacing: '0.1em' }}>
                {project.category}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Metadados Executivos (Ano e Papel) */}
        {(project.year || project.role) && (
          <Box sx={{ display: 'flex', gap: 6, mb: 6 }}>
            {project.role && (
              <Box>
                <Typography variant="overline" sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.sage, letterSpacing: '0.1em', display: 'block', mb: 0.5 }}>
                  Papel
                </Typography>
                <Typography sx={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.5rem', color: palette.ink }}>
                  {project.role}
                </Typography>
              </Box>
            )}
            {project.year && (
              <Box>
                <Typography variant="overline" sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.sage, letterSpacing: '0.1em', display: 'block', mb: 0.5 }}>
                  Ano
                </Typography>
                <Typography sx={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.5rem', color: palette.ink }}>
                  {project.year}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Ferramentas e Links */}
        {((project.tools && project.tools.length > 0) || project.repository_url || project.live_demo) && (
          <Box sx={{ mb: 6 }}>
            {project.tools && project.tools.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {project.tools.map(tool => (
                  <Typography
                    key={tool.id}
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.875rem',
                      color: palette.ink,
                      backgroundColor: 'rgba(26,23,20,0.05)',
                      px: 2,
                      py: 0.5,
                      borderRadius: '100px',
                      border: `1px solid ${palette.sand}`
                    }}
                  >
                    {tool.name}
                  </Typography>
                ))}
              </Box>
            )}
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              {project.live_demo && (
                <Typography
                  component="a"
                  href={project.live_demo}
                  target="_blank"
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: palette.cream,
                    backgroundColor: palette.terracotta,
                    px: 3,
                    py: 1,
                    borderRadius: '100px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: palette.ink
                    }
                  }}
                >
                  Ver Projeto
                </Typography>
              )}
              {project.repository_url && (
                <Typography
                  component="a"
                  href={project.repository_url}
                  target="_blank"
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: palette.ink,
                    backgroundColor: 'transparent',
                    border: `1px solid ${palette.ink}`,
                    px: 3,
                    py: 1,
                    borderRadius: '100px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: palette.ink,
                      color: palette.cream
                    }
                  }}
                >
                  Código Fonte
                </Typography>
              )}
            </Box>
          </Box>
        )}

        <Typography variant="body1" sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.sage, fontSize: '1.2rem', mb: 6, maxWidth: '800px' }}>
          {project.short_description}
        </Typography>
      </Box>

      <ProjectScrollytelling project={project} projectCase={fallbackCase} />

      {/* Seção de Vídeo Demonstrativo */}
      {project.video_url && (
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: { xs: 2, md: 4 }, py: 6 }}>
          <Typography sx={{ fontFamily: "'Instrument Serif', serif", fontSize: '3rem', color: palette.ink, mb: 4, textAlign: 'center' }}>
            App em Ação
          </Typography>
          <Box sx={{ 
            borderRadius: '8px', 
            overflow: 'hidden', 
            border: `1px solid ${palette.sand}`,
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            bgcolor: '#000'
          }}>
            <video 
              src={project.video_url} 
              controls 
              muted 
              autoPlay 
              playsInline
              loop
              style={{ width: '100%', display: 'block', maxHeight: '70vh', objectFit: 'contain' }} 
            />
          </Box>
        </Box>
      )}

      {/* Seção da Galeria de Imagens */}
      {project.gallery_urls && project.gallery_urls.length > 0 && (
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 8 }}>
          <Typography sx={{ fontFamily: "'Instrument Serif', serif", fontSize: '3rem', color: palette.ink, mb: 6, textAlign: 'center' }}>
            Galeria do App
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, 
            gap: 4 
          }}>
            {project.gallery_urls.map((url, idx) => (
              <Box 
                key={idx}
                component="img"
                src={url}
                alt={`${project.title} Screenshot ${idx + 1}`}
                sx={{
                  width: '100%',
                  maxWidth: { xs: '320px', md: '100%' },
                  display: 'block',
                  mx: 'auto',
                  height: 'auto',
                  borderRadius: '12px',
                  border: `1px solid ${palette.sand}`,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {nextProject && (
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 12, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: palette.sage, mb: 2 }}>
            Próximo Projeto
          </Typography>
          <Typography 
            component={Link}
            to={`/project/${nextProject.slug || nextProject.id}`}
            sx={{ 
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: { xs: '2.5rem', md: '4rem' },
              color: palette.ink,
              textDecoration: 'none',
              '&:hover': {
                color: palette.terracotta
              }
            }}
          >
            {nextProject.title}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
