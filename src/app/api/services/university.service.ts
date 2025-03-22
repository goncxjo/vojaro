import { Injectable } from '@angular/core';
import { CollectionService } from './collection.service';
import { University } from '../models/university/university';

@Injectable({
  providedIn: 'root'
})
export class UniversityService extends CollectionService<University> {
  constructor() {
    super('universities');
  }
}
