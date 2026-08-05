export interface Certificate {
  id: string;
  name: string;
  description: string | null;
  issued_by: string;
  issued_at: string; // ISO format date 'YYYY-MM-DD'
  image_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}
