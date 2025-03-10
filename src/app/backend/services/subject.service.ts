import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, query, QueryConstraint, updateDoc, where } from '@angular/fire/firestore';
import _ from 'lodash';
import { Subject, SubjectFilters, SubjectList } from '../models/subject/subject';

const PATH = 'subjects';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private _firestore: Firestore;
  private _collection: CollectionReference;

  constructor(
      // private userService: UserService,
  ) {
      this._firestore = inject(Firestore);
      this._collection = collection(this._firestore, PATH);
  }

  getAll(filters: SubjectFilters): Observable<SubjectList[]> {
    return collectionData(
      query(this._collection,
        where('universityId', '==', filters?.universityId || ''),
        where('careerId', '==', filters?.careerId || ''),
    ), { idField: "id" }) as Observable<SubjectList[]>;
  }
  
  getById(id: string): Observable<Subject> {
    const docRef = doc(this._firestore, PATH, id);
    return docData(docRef, { idField: "id" }) as Observable<Subject>;
  }
  
  async update(entity: Subject) {
    // entity.user = this.userService.getUserId();
    const docRef = doc(this._firestore, PATH, entity.id);
    return updateDoc(docRef, { ...entity });
  }
  
  async create(doc: Subject) {
    // doc.user = this.userService.getUserId();
    return await addDoc(this._collection, doc);
  }

  async delete(id: string) {
    const docRef = doc(this._firestore, PATH, id);
    return await deleteDoc(docRef);
  }
}
