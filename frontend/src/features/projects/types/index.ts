export interface Project {
  id: string;
  title: string;
  slug: string | null;
  short_description: string;
  full_description: string | null;
  repository_url: string | null;
  live_demo: string | null;
  image_url: string | null;
  video_url: string | null;
  gallery_urls: string[] | null;
  category: string | null;
  role: string | null;
  year: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectWithTools extends Project {
  tools: { id: string; name: string }[];
}

export interface ProjectCasePhase {
  title: string;
  content: string;
  type: string;
}

export interface ProjectCase {
  projectId: string;
  phases: ProjectCasePhase[];
}
