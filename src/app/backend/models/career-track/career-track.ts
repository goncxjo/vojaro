import { Item } from "../item.type";

export interface CareerTrack extends Item {
    id: string;
    name: string;
    careerId: string;
}

export interface CareerTrackFilters {
    id: string;
    name: string;
}