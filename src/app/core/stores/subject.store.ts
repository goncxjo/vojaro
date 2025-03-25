import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Subject } from '../../api/models/subject/subject';
import { computed, inject } from '@angular/core';
import { SubjectService } from '../../api/services/subject.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap } from 'rxjs';
import _ from 'lodash';

type SubjectsState = {
    subjects: Subject[];
    isLoading: boolean;
    lastSelected: Subject | null;
    selectedSubjects: Subject[];
    filter: { universityId: string; careerId: string; careerTrackId: string; query: string; order: 'asc' | 'desc' };
};

const initialState: SubjectsState = {
    subjects: [],
    isLoading: false,
    lastSelected: null,
    selectedSubjects: [],
    filter: { universityId: 'LvXJZ7m6rmFEKcG7hKZj', careerId: 'clpONiwraXiYuLTTIYpT', careerTrackId: 'clpONiwraXiYuLTTIYpT', query: '', order: 'asc' },
};

export const SubjectStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, subjectService = inject(SubjectService)) => ({
        loadSubjects: rxMethod<void>(
            pipe(
                switchMap(() => subjectService.getAll({
                    universityId: store.filter.universityId(),
                    careerId: store.filter.careerId(),
                    careerTrackId: store.filter.careerTrackId()
                }).pipe(
                    tapResponse({
                        next: (subjects: Subject[]) => {
                            const orderedSubjects = _.orderBy(subjects, [s => s.year, s => s.quarter], ['asc', 'asc']);
                            patchState(store, { subjects: orderedSubjects });
                        },
                        error: (error: any) => console.error(error)
                    })
                ))
            )
        )
    })),
    withComputed(({ subjects }) => ({
        electiveSubjects: computed(() => subjects().filter(s => s.type === 'elective')),
        orientationSubjects: computed(() => subjects().filter(s => s.type === 'orientation')),
        regularSubjects: computed(() => subjects().filter(s => !s.type))
    }))
);