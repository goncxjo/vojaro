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
    const queries: QueryConstraint[] = [
      where('universityId', '==', filters.universityId),
      where('careerId', '==', filters.careerId),
    ]

    const res = collectionData(
      query(this._collection, ...queries
    ), { idField: "id" }) as Observable<SubjectList[]>;

    return res
  }
  
  getById(id: string): Observable<Subject> {
    const docRef = doc(this._firestore, PATH, id);
    const res = docData(docRef, { idField: "id" }) as Observable<Subject>;
    return res;
  }
  
  async update(entity: Subject) {
    // entity.user = this.userService.getUserId();
    const docRef = doc(this._firestore, PATH, entity.id);
    const res = updateDoc(docRef, { ...entity });
    return res;
  }
  
  async create(doc: Subject) {
    // doc.user = this.userService.getUserId();
    const res = await addDoc(this._collection, doc);
    return res;
  }

  async delete(id: string) {
    const docRef = doc(this._firestore, PATH, id);
    const res = await deleteDoc(docRef);
    return res;
  }
}
