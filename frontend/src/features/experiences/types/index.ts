export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ExperienceWithTools extends Experience {
  tools: { id: string; name: string }[];
  highlight?: string;
}
