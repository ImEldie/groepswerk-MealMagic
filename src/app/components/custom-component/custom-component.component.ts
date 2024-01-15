export interface IngredientInfo {
  data: Array<Ingredient>
  
}

 export interface Ingredient {
  id: number;
  name: string;
  kcal: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  allergy_ids?: [];
}

export interface UserDetails {
  data: Array<Details>
}

interface Details {
  id: number;
  user_id: number;
  bodyweight: number;
  height: number;
  allergy_ids?: [];
}

export interface Fridges {
  data: Array<Fridge>
}

interface Fridge {
  id: number;
  user_detail_id: number;
}

export interface FridgeIngredients {
  data: Array<Ingredients>
}

interface Ingredients {
  id: number;
  fridge_id: number;
  ingredient_id: number;
  amount: number;
}