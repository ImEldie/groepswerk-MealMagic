import { DishSeason } from "./interfaces-seasons";
import { DishStep } from "./interfaces-steps";
import { DishType } from "./interfaces-types";

export interface DishApiResponse {
  data: Array<Dish>;
}

export interface DishPostData{
  name: string,
  image_url: string,
  description?: string,
  duration: number,
  amount_of_people: number,
  season_id: number,
  ingredients: Array<number>,
  dish_types: Array<number>,
  dish_steps: Array<number>
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
  id: number,
  name: string,
  amount: IngredientAmount
}
interface IngredientAmount {
  value: number,
  unit: string
}