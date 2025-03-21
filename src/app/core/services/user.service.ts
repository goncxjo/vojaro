import { inject, Injectable, signal } from '@angular/core';
import { Auth, signOut, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { doc, docData, DocumentSnapshot, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { debounceTime, filter, from, map, Observable, Subscription, switchMap, take, tap } from 'rxjs';
import { AppUser } from '../../api/models/user/user';
import { Roles } from '../../api/models/user/roles.enum';
import { HttpService } from './http.service';

const PATH = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _firestore: Firestore;
  private httpService = inject(HttpService);

  private emptyUser = {
    id: '',
    name: 'Invitad@',
    email: '',
    role: Roles.VIEWER
  } as AppUser

  userInfo = signal<AppUser>(this.emptyUser);
  sub!: Subscription;
  
  constructor(
    private auth: Auth,
  ) {
      this._firestore = inject(Firestore);
      auth.onAuthStateChanged((user: User | null) => {
        if (user) {
          this.sub = this.getUserInfo(user.uid).pipe(
            take(1),
            debounceTime(1000),
            tap((res) => this.userInfo.set(res)),
            filter((res) => !res.email), // TODO: veridicar de otra manera
            switchMap((res) => this.createUserInfo(user)),
        ).subscribe()
      }
    });
  }
  
  getUserInfo(id: string): Observable<AppUser> {
    const docRef = doc(this._firestore, PATH, id);
    return this.httpService.run<AppUser>( 
      from(getDoc(docRef)).pipe(
        map((res: DocumentSnapshot) => this.createAppUser(res))
      )
    );
  }

  async createUserInfo(user: User) {
    const entity = {
      name: user.displayName ?? '',
      email: user.email ?? '',
      role: Roles.EDITOR
    };

    this.userInfo.set({ id: user.uid, ...entity });

    const docRef = doc(this._firestore, PATH, user.uid);
    return this.httpService.run<AppUser>( 
      from(setDoc(docRef, {...entity})).pipe(
        map((_) => this.createAppUser(entity))
      )
    );
  }

  private createAppUser(res: DocumentSnapshot | Partial<AppUser>, id?: string): AppUser {
    const d = res instanceof DocumentSnapshot ? res.data() ?? this.emptyUser : res;
    d['id'] = res.id || id;    
    return d as AppUser;
  }

  initAppUser(user: User) {
    this.userInfo.set({
      id: user.uid, 
      name: user.displayName ?? '',
      email: user.email ?? '',
      role: Roles.EDITOR
    });
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  logout() {
    return signOut(this.auth);
  }

  getUserName() {
    return this.auth.currentUser?.displayName || 'Invitad@'
  }

  getCurrentUser() {
    return this.auth.currentUser ?? {
      displayName: 'Invitad@',
      photoURL: `default-user.jpg`
    };
  }

  getUserId() {
    return this.auth.currentUser?.uid || '';
  }

  isLoggedIn() {
    return !!this.auth.currentUser
  }

  isAdmin() {
    return this.userInfo().role === Roles.ADMIN;
  }

  isEditor() {
    return this.userInfo().role === Roles.EDITOR;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}