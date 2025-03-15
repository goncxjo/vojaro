import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, query, QueryConstraint, updateDoc, where } from '@angular/fire/firestore';
import _ from 'lodash';
import { UserService } from '../../core/services/user.service';
import { StudentSubject } from '../models/subject/subject-subject';
import { SubjectFilters } from '../models/subject/subject';

const PATH = 'studentsSubjects';

@Injectable({
  providedIn: 'root'
})
export class StudentSubjectService {
  private _firestore: Firestore;
  private _collection: CollectionReference;

  constructor(
      private userService: UserService,
  ) {
      this._firestore = inject(Firestore);
      this._collection = collection(this._firestore, PATH);
  }

  getAll(filters: SubjectFilters): Observable<StudentSubject[]> {
    const userId = this.userService.getUserId();

    return collectionData(
      query(this._collection,
        where('userId', '==', userId),
        where('universityId', '==', filters?.universityId || ''),
        where('careerId', '==', filters?.careerId || ''),
    ), { idField: "id" }) as Observable<StudentSubject[]>;
  }
  
  getById(id: string): Observable<StudentSubject> {
    const docRef = doc(this._firestore, PATH, id);
    return docData(docRef, { idField: "id" }) as Observable<StudentSubject>;
  }
  
  async update(entity: StudentSubject) {
    const docRef = doc(this._firestore, PATH, entity.id);
    return updateDoc(docRef, { ...entity });
  }
  
  async create(doc: StudentSubject) {
    return await addDoc(this._collection, doc);
  }

  async delete(id: string) {
    const docRef = doc(this._firestore, PATH, id);
    return await deleteDoc(docRef);
  }
}
