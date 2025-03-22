import { Item } from "../item.type";

export interface Career extends Item {
    id: string;
    name: string;
    length: number;
    universityId: string;
}

export interface CareerFilters {
    id: string;
    name: string;
}