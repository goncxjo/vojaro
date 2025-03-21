import { Roles } from "./roles.enum";

export interface AppUser {
    id: string;
    name: string;
    email: string;
    role: Roles;
}
