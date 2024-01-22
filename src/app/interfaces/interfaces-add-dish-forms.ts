import { DishStep } from "./interfaces-steps";

export interface AddDishNameInputs {
    name: string;
    description: string;
    image: string;
    dataIsValid: boolean;
}

export interface AddDishDetailInputs {
    portionSize: number;
    prepTime: number;
    seasonId: number;
    selectedTypeIds: Array<number>;
    dataIsValid: boolean;
}

export interface AddDishSelectedIngredients {
    ingredientIds: Array<number>;
    dataIsValid: boolean;
}

export interface AddDishCreatedSteps {
    createdSteps: Array<DishStep>;
    dataIsValid: boolean;
}