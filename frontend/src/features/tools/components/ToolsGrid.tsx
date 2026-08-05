import React, { useState } from 'react';
import { Box, Typography, Chip, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AnimatedReveal, SectionHeader } from '../../../shared/components';
import { palette } from '../../../shared/theme';
import { useCategories, useTools } from '../../../shared/api/hooks';

/**
 * Editorial Tools and Skills Grid
 */
export const ToolsGrid: React.FC = () => {
  const { data: categories, isLoading: isLoadingCat } = useCategories();
  const { data: tools, isLoading: isLoadingTools } = useTools();

  const [selectedTool, setSelectedTool] = useState<{ name: string; description: string } | null>(null);

  const displayCategories = categories || [];
  const displayTools = tools || [];
  const isLoading = isLoadingCat || isLoadingTools;

  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4, lg: 8 }, py: 8 }}>
      <SectionHeader number="04" title="Ferramentas" />
      
      <AnimatedReveal delay={100}>
        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.ink, opacity: 0.8, fontSize: '1.2rem', mt: 4, maxWidth: '800px' }}>
          Todas as ferramentas, arquiteturas e tecnologias listadas abaixo foram aplicadas de forma prática e validadas em experiências reais de projetos, laboratórios ou estágios.
        </Typography>
      </AnimatedReveal>

      {isLoading ? (
        <Box sx={{ mt: 6 }}>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.ink, opacity: 0.6, fontSize: '1.1rem' }}>
            Carregando ferramentas...
          </Typography>
        </Box>
      ) : displayCategories.length === 0 ? (
        <Box sx={{ mt: 6 }}>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: palette.ink, opacity: 0.6, fontSize: '1.1rem' }}>
            As ferramentas certas no momento certo. (Nenhuma ferramenta cadastrada)
          </Typography>
        </Box>
      ) : (
        <Box
        sx={{
          mt: 6,
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: { xs: 6, md: 8 }
        }}
      >
        {displayCategories.map((category, index) => {
          const PREFERRED_ORDER = [
            'Swift', 'SwiftUI', 'UIKit', 'SwiftData', 'Core ML',
            'React', 'TypeScript', 'Material UI',
            'Python', 'FastAPI', 'SQLAlchemy', 'Docker',
            'PostgreSQL',
            'Clean Architecture', 'MVVM', 'Princípios S.O.L.I.D.', 'TDD',
            'Git', 'GitHub', 'Figma'
          ];

          const categoryTools = displayTools
            .filter((t) => t.category_id === category.id)
            .sort((a, b) => {
              if (a.is_primary && !b.is_primary) return -1;
              if (!a.is_primary && b.is_primary) return 1;
              
              // Se ambas tiverem a mesma prioridade, ordenamos pela lista preferida
              const indexA = PREFERRED_ORDER.indexOf(a.name);
              const indexB = PREFERRED_ORDER.indexOf(b.name);
              
              if (indexA !== -1 && indexB !== -1) return indexA - indexB;
              if (indexA !== -1) return -1; // a tem prioridade
              if (indexB !== -1) return 1;  // b tem prioridade

              // Se nenhuma estiver na lista, ordem alfabética
              return a.name.localeCompare(b.name);
            });
          
          if (categoryTools.length === 0) return null;

          return (
            <Box key={category.id}>
              <AnimatedReveal delay={index * 100}>
                <Typography
                  variant="overline"
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: palette.sage,
                    letterSpacing: '0.1em',
                    display: 'block',
                    mb: 3
                  }}
                >
                  {category.name}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {categoryTools.map((tool) => (
                    <Chip
                      key={tool.id}
                      label={tool.name}
                      variant={tool.is_primary ? "filled" : "outlined"}
                      onClick={() => setSelectedTool(tool)}
                      sx={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: tool.is_primary ? palette.cream : palette.ink,
                        borderColor: palette.sage,
                        backgroundColor: tool.is_primary ? palette.terracotta : 'transparent',
                        borderRadius: '4px',
                        px: 1,
                        py: 2.5,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: palette.terracotta,
                          backgroundColor: tool.is_primary ? palette.ink : 'rgba(184,68,42,0.05)',
                          color: tool.is_primary ? palette.cream : palette.ink
                        }
                      }}
                    />
                  ))}
                </Box>
              </AnimatedReveal>
            </Box>
          );
        })}
        </Box>
      )}

      {/* Tool Dialog */}
      <Dialog 
        open={Boolean(selectedTool)} 
        onClose={() => setSelectedTool(null)}
        PaperProps={{
          sx: {
            backgroundColor: palette.paper,
            borderRadius: '8px',
            maxWidth: '600px',
            width: '100%',
            p: { xs: 2, md: 4 }
          }
        }}
      >
        <DialogTitle sx={{ 
          fontFamily: "'Instrument Serif', serif", 
          fontSize: { xs: '2rem', md: '2.5rem' }, 
          color: palette.terracotta,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pb: 2,
          lineHeight: 1.2
        }}>
          <Box sx={{ pr: 2 }}>{selectedTool?.name}</Box>
          <IconButton 
            onClick={() => setSelectedTool(null)} 
            sx={{ 
              color: palette.ink, 
              mt: -1, 
              mr: -1,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)' }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ borderTop: `1px solid ${palette.sand}`, pt: 3, mt: 1 }}>
          <Typography sx={{ 
            fontFamily: "'DM Sans', sans-serif", 
            color: palette.ink, 
            fontSize: '1.15rem', 
            lineHeight: 1.8, 
            opacity: 0.85 
          }}>
            {selectedTool?.description || "Descrição detalhada não disponível para esta ferramenta."}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
