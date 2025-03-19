import { Item } from "../item.type";

export interface CareerList extends Item {
    id: string;
    name: string;
    length: number;
    universityId: string;
}

export interface Career {
    id: string;
    name: string;
    length: number;
}

export interface CareerFilters {
    id: string;
    name: string;
}