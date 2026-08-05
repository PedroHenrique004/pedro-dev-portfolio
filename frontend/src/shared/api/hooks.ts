import { useQuery } from '@tanstack/react-query';
import { apiClient } from './client';
import type { Profile } from '../../features/profile/types';
import type { ExperienceWithTools } from '../../features/experiences/types';
import type { ProjectWithTools } from '../../features/projects/types';
import type { Category, ToolWithCategory } from '../../features/tools/types';
import type { Testimonial } from '../../features/testimonials/types';
import type { Certificate } from '../../features/certificates/types';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await apiClient.get('/profiles/');
      // Get the first profile if available
      if (response.data && response.data.length > 0) {
        return response.data[0] as Profile;
      }
      return null;
    }
  });
};

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const response = await apiClient.get('/experiences/');
      return response.data.map((exp: any) => ({
        ...exp,
        tools: exp.tools || [] // fallback since backend might not send nested tools yet
      })) as ExperienceWithTools[];
    }
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await apiClient.get('/projects/');
      return response.data.map((proj: any) => ({
        ...proj,
        tools: proj.tools || [],
        category: proj.category || 'Geral'
      })) as ProjectWithTools[];
    }
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get('/categories/');
      return response.data as Category[];
    }
  });
};

export const useTools = () => {
  return useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const response = await apiClient.get('/tools/');
      return response.data as ToolWithCategory[];
    }
  });
};

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await apiClient.get('/testimonials/');
      return response.data as Testimonial[];
    }
  });
};

export const useCertificates = () => {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const response = await apiClient.get('/certificates/');
      return response.data as Certificate[];
    }
  });
};
