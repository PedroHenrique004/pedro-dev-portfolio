export interface Profile {
  id: string;
  full_name: string;
  tagline: string | null;
  short_bio: string | null;
  about: string | null;
  email: string;
  linkedin_url: string | null;
  github_url: string | null;
  created_at: string;
  updated_at: string;
}
