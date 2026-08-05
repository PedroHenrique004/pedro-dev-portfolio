export interface Tool {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category_id: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ToolWithCategory extends Tool {
  category: Category;
}
