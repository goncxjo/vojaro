import { inject, Injectable } from '@angular/core';
import { from, map, Observable, of, take } from 'rxjs';
import { collection, collectionData, CollectionReference, doc, docData, DocumentSnapshot, Firestore, getDoc, getDocs, query, QuerySnapshot } from '@angular/fire/firestore';
import { Item } from '../models/item.type';
import _ from 'lodash';
import { HttpService } from '../../core/services/http.service';

@Injectable()
export class CollectionService<T extends Item> {
  private _firestore: Firestore;
  private _collection!: CollectionReference;
  private _path!: string;
  private serviceReady: boolean = false;
  private httpService = inject(HttpService);
  
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
      return this.httpService.run<T[]>(
        from(getDocs(this._collection)).pipe(
          map((res: QuerySnapshot) => {
            const items = res.docs.map((n) => {
              return this.createItem(n);
            });
            if(name) {
              var regex = new RegExp(`${name}`, 'gi');  
              return _.filter(items, (i: T) => regex.test(i.name));
            }
            return items;
          }),
        )
      )
    }
  }
  
  getById(id: string): Observable<T> {
    if (!this.serviceReady) {
      console.error('service not initialized!')
      return of({} as T);
    }
    else {
      const docRef = doc(this._firestore, this._path, id);
      return this.httpService.run<T>( 
        from(getDoc(docRef)).pipe(
          map((res: DocumentSnapshot) => this.createItem(res))
        )
      );
    }
  }

  private createItem(res: DocumentSnapshot | Partial<T>, id?: string): T {
    const d = res instanceof DocumentSnapshot ? res.data() ?? { id: '', name: ''} : res;
    d['id'] = res.id || id;
    return d as T;
  }
}
