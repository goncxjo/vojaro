import { signalStore, withComputed, withState } from '@ngrx/signals';
import { Subject } from '../../api/models/subject/subject';
import { computed } from '@angular/core';

type SubjectsState = {
    subjects: Subject[];
    isLoading: boolean;
    lastSelected: Subject | null;
    selectedSubjects: Subject[];
    filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: SubjectsState = {
    subjects: [],
    isLoading: false,
    lastSelected: null,
    selectedSubjects: [],
    filter: { query: '', order: 'asc' },
};

export const SubjectStore = signalStore(
    withState(initialState),
    withComputed(({ subjects }) => ({
        electiveSubjects: computed(() => subjects().filter(s => s.type === 'elective')),
        orientationSubjects: computed(() => subjects().filter(s => s.type === 'orientation')),
        regularSubjects: computed(() => subjects().filter(s => !s.type))
    }))
);