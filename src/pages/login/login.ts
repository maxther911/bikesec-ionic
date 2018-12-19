import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, IonicPage, List, Nav } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../service/auth.service';
import { SignupPage } from '../signup/signup';
import { ListPage } from '../list/list';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string;
  @ViewChild(Nav) nav: Nav;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private message: MessageService,
    nav: Nav,
    fb: FormBuilder
  ) {
    this.nav = nav;
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    auth.user.subscribe(user => {
      if (user) {
        this.navCtrl.push(ListPage)
      }
    })
  }

  login() {
    let data = this.loginForm.value;
    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => this.loginError = error.message
      );
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle();
  }

  loginWithFacebook() {
    this.auth.signInWithFacebook();
    if (this.auth.authenticated) {
      this.navCtrl.push(ListPage)
    }
  }

}