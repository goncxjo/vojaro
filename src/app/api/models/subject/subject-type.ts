export type SubjectType = '' | 'cross-disciplinary' | 'elective' | 'orientation' | 'elective-slot' | 'orientation-slot' | 'final';

export interface SubjectTypeOption {
    id: SubjectType;
    name: string;
}

export const SUBJECT_TYPE_OPTIONS: SubjectTypeOption[] = [
    { id: '', name: 'Normal' },
    { id: 'cross-disciplinary', name: 'Interdisciplinaria' },
    { id: 'elective', name: 'Electiva' },
    { id: 'orientation', name: 'Orientación' },
    { id: 'elective-slot', name: 'Genérica (Electiva)' },
    { id: 'orientation-slot', name: 'Genérica (Orientación)' },
    { id: 'final', name: 'Final' }
];
