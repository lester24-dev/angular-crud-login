import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private firebases: FirebaseApp,
    private db: AngularFireDatabase
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', null || '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });
  }
  // Login in with email/password
  SignIn(email: any, password: any) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }
  // Register user with email/password
  RegisterUser(value: any) {
    return this.ngFireAuth.createUserWithEmailAndPassword(value.email, value.password)
    .then((user: any)=>{
      console.log(user)
      return this.db.database.ref().child("User").child(user.user._delegate.uid).set(value)
    });
  }
  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then((user: any) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['login']);
      });
    });
  }
  // Recover password
  PasswordRecover(passwordResetEmail: any) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.emailVerified !== false ? true : false;
  }
  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth providers
  AuthLogin(provider: any) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['qr']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Store user in localStorage
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `user/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }


  //Insert
  // Insert data into Firebase Realtime Database
  insertDataNotifQR(data1: any, data2: any) {
    const ref_admin = this.db.list('admin_notifications'); // Replace with your collection name
    const ref_dep = this.db.list('department_notifications'); // Replace with your collection name
    ref_dep.push(data2)
    return ref_admin.push(data1);
  }

  // Retrieve a single item by its key from Realtime Database
  getItemByKey(itemKey: string, table: string) {
    return this.db.object(`${table}/${itemKey}`).valueChanges();
  }
}