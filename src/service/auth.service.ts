import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Platform } from 'ionic-angular';
import { MessageService } from './message.service';

import { GooglePlus } from '@ionic-native/google-plus'

@Injectable()
export class AuthService {
	public user: Observable<firebase.User> = null;
	private platform;

	constructor(
		public afAuth: AngularFireAuth,
		platform: Platform,
		private gplus: GooglePlus,
		private message: MessageService) {
		this.platform = platform;
		this.user = afAuth.authState;
	}

	signInWithEmail(credentials) {
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			credentials.password);
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	signInWithGoogle()  {
    console.log("Google login click.....")
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
      this.message.showAlert("Plataforma es cordova");
    } else {
      this.webGoogleLogin();
      this.message.showAlert("Plataforma no es cordova");
    }
  }

  async nativeGoogleLogin(): Promise<firebase.User> {
    
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '831545385398-chj1uqm25oi5j93l10gif3ifuicqived.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
    } catch (err) {
      this.message.showAlert("Error: " + err)
    }
  }

  async webGoogleLogin(): Promise<firebase.User> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      return credential.user
    } catch (err) {
      this.message.showAlert("Error en webLogin: " + err)
    }
	}
	
	signInWithFacebook() {
		this.afAuth.auth
			.signInWithPopup(
				new firebase.auth.FacebookAuthProvider())
			.then(res => console.log(res))
			.catch(error => console.log(error));
	}

  signOut(){
    this.afAuth.auth.signOut();
    if(this.platform.is('cordova')){
      this.gplus.logout();
    }
     
  }

}

