export interface Subject {
    id: string;
    name: string;
    universityId: string;
    careerId: string;
    year: number;
    quarter: number;
    type: string;
    mustApproved: string[];
    mustRegularize: string[];
    careerTracks: string[];
}

export interface SubjectFilters {
    universityId: string;
    careerId: string;
    careerTrackId: string;
}
