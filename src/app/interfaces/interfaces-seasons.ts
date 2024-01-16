export interface SeasonsApiResponse{
    current_page?: number;
    data: DishSeason[];
    first_page_url?: string;
    from?: number;
    last_page?: number;
    last_page_url?: string;
    links?: any;
    next_page_url?: string | null;
    path?: string;
    per_page?: number;
    prev_page_url?: string | null;
    to?: number;
    total?: number;
}

export interface DishSeason {
    id: number;
    name: string;
}