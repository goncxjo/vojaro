import { Item } from "../item.type";

export interface UniversityList extends Item {
    id: string;
    name: string;
    code: string;
}

export interface University {
    id: string;
    name: string;
    code: string;
}

export interface UniversityFilters {
    id: string;
    name: string;
    code: string;
}