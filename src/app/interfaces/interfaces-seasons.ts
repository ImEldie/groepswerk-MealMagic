export interface SeasonsApiResponse{
    data: DishSeason[];
}

export interface DishSeason {
    id: number;
    name: string;
}