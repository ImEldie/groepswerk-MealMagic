export interface Recipe {
    id: number;
    name: string;
    photo: string;
    prepTime: number;
    portionSize: number;
    types: Array<string>;
    season: string;
    steps?: Array<RecipeStep>;
  };
interface RecipeStep {
    title: "string";
    description: "string";
    img: "string";
}