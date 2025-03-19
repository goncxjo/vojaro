export interface Subject {
    id: string;
    name: string;
    universityId: string;
    careerId: string;
    year: number;
    quarter: number;
    type: string;
    mustApproved: any[];
    mustRegularize: any[];
    careerTracks: any[];
}

export interface SubjectFilters {
    universityId: string;
    careerId: string;
    careerTrackId: string;
}
