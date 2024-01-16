export interface IngredientApiResponse{
  data: Array<Ingredient>;
}
export interface Ingredient {
  id: number;
  name: string;
  kcal: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  allergies: Array<Allergy>;
}
interface Allergy {
  id: number;
  name: string;
}