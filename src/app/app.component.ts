import { Component, ViewChild } from '@angular/core';
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddRobberyPage } from '../pages/add-robbery/add-robbery';
import { AddBikePage } from '../pages/add-bike/add-bike';
import { AuthService } from '../service/auth.service';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  pages: Array<{ title: string, component: any }>;
  @ViewChild(Nav) nav: Nav;

  private app;
  private platform;
  private menu: MenuController;

  constructor(
    app: App,
    platform: Platform,
    menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private auth: AuthService) {
    this.menu = menu;
    this.app = app;
    this.platform = platform;
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Mis Bicicletas', component: ListPage },
      { title: 'Registrar Hurto', component: AddRobberyPage },
      { title: 'Registrar Bicicleta', component: AddBikePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.rootPage = HomePage
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    if (this.auth.authenticated) {
      this.rootPage = ListPage;
    } else {
      this.rootPage = HomePage;
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  login() {
    console.log("Login App Component")
    this.menu.close();
    this.nav.setRoot(LoginPage);
  }

  logout() {
    console.log("Login App Component")
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(HomePage);
  }
}
