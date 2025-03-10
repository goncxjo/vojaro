import { inject, Injectable } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { collection, collectionData, CollectionReference, doc, docData, Firestore, query } from '@angular/fire/firestore';
import { Item } from '../models/item.type';
import _ from 'lodash';

@Injectable()
export class CollectionService<T extends Item> {
  private _firestore: Firestore;
  private _collection!: CollectionReference;
  private _path!: string;
  private serviceReady: boolean = false;
  
  constructor() {
      this._firestore = inject(Firestore);
  }

  init(path: string) {
    if (path) {
      this._path = path;
      this._collection = collection(this._firestore, path);
      this.serviceReady = true;
    } else {
      console.error('path must have value!')
    }
  }
  
  getAll(name?: string): Observable<T[]> {
    if (!this.serviceReady) {
      console.error('service not initialized!')
      return of([]);
    }
    else {
      const res = collectionData(
        query(this._collection), { idField: "id" }
      ) as Observable<T[]>;
      
      if (name) {
        return res.pipe(
          take(1),
          map((e: T[]) => {
            var regex = new RegExp(`${name}`, 'gi');  
            return _.filter(e, (c: T) => regex.test(c.name));
          }),
        )      
      }
      return res.pipe(take(1));
    }
  }
  
  getById(id: string): Observable<T> {
    if (!this.serviceReady) {
      console.error('service not initialized!')
      return of({} as T);
    }
    else {
      const docRef = doc(this._firestore, this._path, id);
      const res = docData(docRef, { idField: "id" }) as Observable<T>;
      return res.pipe(take(1));
    }
  }
}
