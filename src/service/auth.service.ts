import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
	public user: Observable<firebase.User>;

	constructor(public afAuth: AngularFireAuth) {
		this.user = afAuth.authState;
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			credentials.password);
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

	signInWithGoogle() {
		console.log('Sign in with google');
		this.afAuth.auth
			.signInWithPopup(
				new firebase.auth.GoogleAuthProvider())
			.then(res => console.log(res))
			.catch(error => console.log(error));
	}

	signInWithFacebook() {
		console.log("Ingresando con facebook")
		this.afAuth.auth
			.signInWithPopup(
				new firebase.auth.FacebookAuthProvider())
				.then(res => console.log(res))
				.catch(error => console.log(error));
	}
}
