export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  photo_url: string | null;
  linkedin_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}
