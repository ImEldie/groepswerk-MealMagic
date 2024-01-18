export interface TypesApiResponse{
    data: DishType[];
}

export interface DishType {
    id: number;
    name: string;
}