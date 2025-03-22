export type SubjectState = '' | 'approved' | 'regularized' | 'in-progress';

export interface SubjectStateOption {
    id: SubjectState;
    name: string;
}

export const SUBJECT_STATE_OPTIONS: SubjectStateOption[] = [
    { id: '', name: 'Sin estado' },
    { id: 'approved', name: 'Aprobada' },
    { id: 'regularized', name: 'Regularizada' },
    { id: 'in-progress', name: 'Cursando' },
];