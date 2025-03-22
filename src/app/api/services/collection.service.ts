import { inject, Injectable, InjectionToken, Inject } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { collection, CollectionReference, doc, DocumentSnapshot, Firestore, getDoc, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { Item } from '../models/item.type';
import _ from 'lodash';
import { HttpService } from '../../core/services/http.service';

export const COLLECTION_PATH = new InjectionToken<string>('COLLECTION_PATH');

@Injectable()
export class CollectionService<T extends Item> {
  private _firestore: Firestore;
  private _collection: CollectionReference;
  private _path: string;
  private httpService = inject(HttpService);
  
  constructor(@Inject(COLLECTION_PATH) path: string) {
    if (!path) {
      throw new Error('path must have value!');
    }
    this._firestore = inject(Firestore);
    this._path = path;
    this._collection = collection(this._firestore, path);
  }
  
  getAll(name?: string): Observable<T[]> {
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
  
  getById(id: string): Observable<T> {
    const docRef = doc(this._firestore, this._path, id);
    return this.httpService.run<T>( 
      from(getDoc(docRef)).pipe(
        map((res: DocumentSnapshot) => this.createItem(res))
      )
    );
  }

  private createItem(res: DocumentSnapshot | Partial<T>, id?: string): T {
    const d = res instanceof DocumentSnapshot ? res.data() ?? { id: '', name: ''} : res;
    d['id'] = res.id || id;
    return d as T;
  }
}
