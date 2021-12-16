export interface PagedData<T> {
    total: number | null;
    data: T[];
    // properties para datatables
    recordsTotal: number | null;
    recordsFiltered: number | null;
    draw: number | null;
}
