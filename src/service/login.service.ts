import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';



@Injectable()
export class LoginService {
    private user: Observable<firebase.User>;

    private userDetails: firebase.User = null;


    constructor(private _firebaseAuth: AngularFireAuth) {
        this.user = _firebaseAuth.authState;

        this.user.subscribe(
            (user) => {
                if (user) {
                    this.userDetails = user;
                }
                else {
                    this.userDetails = null;
                }
            }
        );
    }

    signInWithTwitter() {
        return this._firebaseAuth.auth.signInWithPopup(
            new firebase.auth.TwitterAuthProvider()
        )
    }

    signInWithFacebook() {
        return this._firebaseAuth.auth.signInWithPopup(
            new firebase.auth.FacebookAuthProvider()
        )
    }

    signInWithGoogle() {
        return this._firebaseAuth.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )
    }

    signInWithEmail() {
        return this._firebaseAuth.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )
    }

    isLoggedIn() {
        if (this.userDetails == null) {
            return false;
        } else {
            return true;
        }
    }

    logout() {
        /*this._firebaseAuth.auth.signOut()
            .then((res) => this.nav.push(Page1));*/
    }

    public get getUser(): Observable<firebase.User> {
        return this.user;
    }

    public get getUserDetails(): firebase.User {
        return this.userDetails;
    }
}
