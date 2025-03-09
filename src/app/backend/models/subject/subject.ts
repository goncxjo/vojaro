export interface SubjectList {
    id: string;
    name: string;
    universityId: string;
    careerId: string;
}

export interface Subject {
    id: string;
    name: string;
    universityId: string;
    careerId: string;
    year: number;
    quarter: number;
    mustApproved: any[];
    mustRegularize: any[];
    careerOptions: any[];
}

export interface SubjectFilters {
    universityId: string;
    careerId: string;
    careerOptions: any[];
}
