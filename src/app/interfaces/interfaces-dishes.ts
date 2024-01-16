import { DishSeason } from "./interfaces-seasons";
import { DishStep } from "./interfaces-steps";
import { DishType } from "./interfaces-types";

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
    id: number;
    name: string;
    image_url: string;
    description?: string;
    duration: number; 
    amount_of_people: number;
    season: DishSeason;
    ingredients: Array<DishIngredient>;
    dish_types: Array<DishType>;
    dish_steps?: Array<DishStep>;
  };

interface DishIngredient {
  id: number;
  name: string;
  kcal: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  pivot: any;
}

export interface IngredientPostData {
  id: number | undefined,
  name: string,
  amount: IngredientAmount
}
interface IngredientAmount {
  value: number,
  unit: string
}
export interface DishPost {
  name: string, 
  description: string, 
  image: string,
  types: Array<string>,
  season: string | null,
  ingredients: Array<IngredientPostData>,
  amountOfPeople: number,
  preparationTime: number,
  steps: Array<DishStep>,
}