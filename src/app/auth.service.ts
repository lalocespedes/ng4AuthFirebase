import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";

import 'rxjs/add/operator/switchMap';

export class User {

  uid: string;
  username: string = "";

  constructor(auth) {
    this.uid = auth.uid;
  }
}

@Injectable()
export class AuthService {

  currentUser: User;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {

    this.afAuth.authState.switchMap(auth => {
      if (auth) {
        this.currentUser = new User(auth);
        return this.db.object(`/users/${auth.uid}`);
      } else return [];
    })
      .subscribe(user => {
        this.currentUser['username'] = user.username;
      });

  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.afAuth.auth.signInWithPopup(provider)
      .then(() => console.log('success auth'))
      .catch(error => console.log(error));
  }

  // Username Management

  get hasUsername() {
    return this.currentUser.username ? true : false;
  }

  checkUsernamme(username: string) {
    username = username.toLocaleLowerCase()
    return this.db.object(`usernames/${username}`)
  }

  updateUsername(username: string) {

    let data = {}
    data[username] = this.currentUser.uid

    this.db.object(`/users/${this.currentUser.uid}`).update({ "username": username })
    this.db.object(`/usernames`).update(data)

  }

  authenticated() {
    return true;
  }

}
