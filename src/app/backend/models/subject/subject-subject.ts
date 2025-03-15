
export interface StudentSubject {
    id: string;
    userId: string;
    universityId: string;
    careerId: string;
    inProgress: any[]; 
    approved: any[];
    regularized: any[];
}


export interface StudentSubjectFilters {
    universityId: string;
    careerId: string;
    userId: string;
}