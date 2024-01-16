export interface TypesApiResponse{
    current_page?: number;
    data: DishType[];
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

export interface DishType {
    id: number;
    name: string;
}