import { Injectable } from '@angular/core';
import { CollectionService } from './collection.service';
import { CareerTrack } from '../models/career-track/career-track';
import { map, Observable } from 'rxjs';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CareerTrackService extends CollectionService<CareerTrack> {
  constructor() {
    super('careerTracks');
  }

  getByCareer(careerId: string): Observable<CareerTrack[]> {
    return this.getAll().pipe(
      map((tracks) => _.filter(tracks, (track) => track.careerId === careerId))
    );
  }
}
