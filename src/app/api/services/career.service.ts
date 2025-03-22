import { Injectable } from '@angular/core';
import { CollectionService } from './collection.service';
import { Career } from '../models/career/career';
import { map, Observable } from 'rxjs';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CareerService extends CollectionService<Career> {
  constructor() {
    super('careers');
  }

  getByUniversity(universityId: string): Observable<Career[]> {
    return this.getAll().pipe(
      map((careers) => _.filter(careers, (career) => career.universityId === universityId))
    );
  }
}
