export interface DishApiResponse {
  data: Array<Dish>;
}
export interface Dish {
  id: number;
  name: string;
  image_url: string;
  description?: string;
  duration: number; 
  amount_of_people: number;
  season: Season;
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