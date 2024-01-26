export interface Fridge {
  id: number;
  user_detail_id: number;
  ingredients: Array<FridgeIngredient>
}

 export interface FridgeIngredient {
  id: number;
  fridge_id: number;
  ingredient_id: number;
  amount: number;
}

export interface CompactFridgeIngredient {
  id: number;
  name: string;
}

export interface ChangedFridgeIngredient {
  id: number;
  original_amount: number;
  new_amount: number;
}

export interface UserFridge {
  id?: number;
  user_detail_id: number;
}
