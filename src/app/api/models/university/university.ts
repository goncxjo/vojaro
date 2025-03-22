import { Item } from "../item.type";

export interface University extends Item {
    id: string;
    name: string;
    code: string;
}

export interface UniversityFilters {
    id: string;
    name: string;
    code: string;
}