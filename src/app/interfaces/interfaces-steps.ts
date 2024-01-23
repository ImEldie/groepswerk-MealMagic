export interface DishStep {
    title: string;
    description?: string;
    order: number;
    picture: string;
}

export interface Step {
    id: number;
    title: string;
    description?: string;
    order: number; 
    picture?: string;
}