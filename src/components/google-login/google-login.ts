import { AuthService } from './../../service/auth.service';
import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs'


/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {
  user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private auth: AuthService) {
    this.user = this.afAuth.authState;
  }

  googleLogin() {
    this.auth.signInWithGoogle();
  }

  signOut() {
    this.auth.signOut();
  }
}
