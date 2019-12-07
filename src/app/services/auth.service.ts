import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth, User } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afStore: AngularFirestore) { }

  registerUser(email: string, password: string) {
    return new Promise ((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData),
          this.updateUserData(userData.user);
        }).catch(err => console.log(reject(err)));
    });
  }

  loginEmailUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => {
        this.updateUserData(credential.user);
      });
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        admin: true
      }
    };
    return userRef.set(data, { merge: true });
  }

  isAuth() {
    // tslint:disable-next-line:no-shadowed-variable
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  isUserAdmin(userUid) {
    return this.afStore.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }

}
