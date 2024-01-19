export interface Fridge {
  id: number;
  user_detail_id: number;
}
export interface FridgeRespone {
  data: Array<Fridge>;
}
export interface FridgeIngredientResponse {
  data: Array<FridgeIngredient>;
}
export interface FridgeIngredient {
  id: number;
  ingredient_id: number;
  fridge_id: number;
  amount: number;
}
