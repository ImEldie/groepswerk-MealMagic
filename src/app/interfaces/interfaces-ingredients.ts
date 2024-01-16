export interface IngredientApiResponse{
  current_page?: number;
  data: Ingredient[];
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  links?: any;
  next_page_url?: string | null;
  path?: string;
  per_page?: number;
  prev_page_url?: string | null;
  to?: number;
  total?: number;
}

export interface Ingredient {
  id: number;
  name: string;
  kcal: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  allergies: Array<Allergy>;
  pivot?: any;
}

interface Allergy {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  pivot?: any;
}