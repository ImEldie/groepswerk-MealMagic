export interface DishApiResponse {
  currentPage?: number;
  data: Array<Dish>;
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  links?: Array<DishApiLinks>;
  next_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: string;
  to?: number;
  total?: number;
}

interface DishApiLinks {
  url: string | null;
  label: string | number;
  active: boolean;
}

export interface Dish {
    id: number; // id
    name: string;
    image_url: string;
    description?: string;
    prepTime: number; //duration
    portionSize: number; //amount_of_people
    season: Season; //season_id
    ingredients: Array<Ingredient>;
    types: Array<DishType>; //dish_types
    steps?: Array<DishStep>;  //dish_steps
  };
interface Ingredient {
  id: number;
  name: string;
  kcal: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}
interface DishType {
  id: number;
  name: string;
}
interface DishStep {
  title: string;
  description: string;
  img: string;
}
interface Season {
  id: number;
  name: string;
}