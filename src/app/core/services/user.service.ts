import { inject, Injectable, signal } from '@angular/core';
import { Auth, signOut, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { debounceTime, filter, Observable, Subscription, switchMap, take, tap } from 'rxjs';
import { AppUser } from '../../api/models/user/user';
import { Roles } from '../../api/models/user/roles.enum';

const PATH = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _firestore: Firestore;

  private emptyUser = {
    id: '',
    name: 'Invitad@',
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
            filter((res) => !res.id),
            switchMap((res) => this.createUserInfo(user)),
        ).subscribe()
      }
    });
  }
  
  getUserInfo(id: string): Observable<AppUser> {
    const docRef = doc(this._firestore, PATH, id);
    return docData(docRef, { idField: "id" }) as Observable<AppUser>;
  }

  initAppUser(user: User) {
    this.userInfo.set({
      id: user.uid, 
      name: user.displayName ?? '',
      role: Roles.EDITOR
    });
  }

  async createUserInfo(user: User) {  
    const entity = {
      name: user.displayName ?? '',
      role: Roles.EDITOR
    };

    this.userInfo.set({ id: user.uid, ...entity });

    const docRef = doc(this._firestore, PATH, user.uid);
    return setDoc(docRef, { ...entity }, { merge: true });
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