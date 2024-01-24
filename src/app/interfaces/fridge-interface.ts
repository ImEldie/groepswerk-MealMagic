export interface Fridges {
  data: Array<Fridge>
}

export interface Fridge {
  id: number;
  user_detail_id: number;
  ingredients: Array<FridgeIngredient>
}

export interface FridgeIngredients {
  data: Array<FridgeIngredient>
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
