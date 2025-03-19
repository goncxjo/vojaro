import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { addDoc, collection, CollectionReference, doc, DocumentReference, DocumentSnapshot, Firestore, getDoc, getDocs, query, QuerySnapshot, updateDoc, where } from '@angular/fire/firestore';
import _ from 'lodash';
import { Subject, SubjectFilters } from '../models/subject/subject';
import { HttpService } from '../../core/services/http.service';

const PATH = 'subjects';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private _firestore: Firestore;
  private _collection: CollectionReference;
  private httpService = inject(HttpService);

  constructor(
      // private userService: UserService,
  ) {
      this._firestore = inject(Firestore);
      this._collection = collection(this._firestore, PATH);
  }

  getAll(filters: SubjectFilters): Observable<Subject[]> {
    const _query = query(this._collection,
      where('universityId', '==', filters?.universityId || ''),
      where('careerId', '==', filters?.careerId || ''),
    );

    return this.httpService.run<Subject[]>(
      from(getDocs(_query)).pipe(
        map((res: QuerySnapshot) => {
          const subjects = res.docs.map((n) => this.createSubject(n));
          return subjects.filter((s: Subject) => {
            return s.careerTracks && s.careerTracks.length > 0 ? s.careerTracks.find(t => t === filters?.careerTrackId) : true;
          })
        })
      )
    )
  }
  
  getById(id: string): Observable<Subject> {
    const docRef = doc(this._firestore, PATH, id);
    return this.httpService.run<Subject>( 
      from(getDoc(docRef)).pipe(
        map((res: DocumentSnapshot) => this.createSubject(res))
      )
    );
  }
  
  async update(entity: Subject) {
    const docRef = doc(this._firestore, PATH, entity.id);
    return this.httpService.run<Subject>( 
      from(updateDoc(docRef, {...entity})).pipe(
        map((_) => this.createSubject(entity))
      )
    );
  }
  
  async create(entity: Subject) {
    return this.httpService.run<Subject>( 
      from(addDoc(this._collection, {...entity})).pipe(
        map((res: DocumentReference) => this.createSubject(res, res.id))
      )
    );
  }

  async delete(id: string) {
    // const docRef = doc(this._firestore, PATH, id);
    // return await deleteDoc(docRef);
  }

  private createSubject(res: DocumentSnapshot | Partial<Subject>, id?: string): Subject {
    const d = res instanceof DocumentSnapshot ? res.data() ?? this.new() : res;
    d['id'] = res.id || id;
    return d as Subject;
  }

  new(): Subject {
    return {
      id: '',
      name: '',
      universityId: '',
      careerId: '',
      year: 0,
      quarter: 0,
      type: '',
      mustApproved: [],
      mustRegularize: [],
      careerTracks: [],
    }
  }
}
