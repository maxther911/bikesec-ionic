import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddBikePage} from '../pages/add-bike/add-bike';
import { AddRobberyPage } from '../pages/add-robbery/add-robbery';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';


// messages Toast
import { ToastController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Importación de los servicios
import { AuthService } from '../service/auth.service';
import { BikeService } from '../service/bikes.service';
import { RobberyService } from '../service/robbery.service';

// Firestore Import
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { firebaseConfig } from './credentials';
// GoogleMaps
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddRobberyPage,
    AddBikePage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddRobberyPage,
    AddBikePage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFirestore,
    BikeService,
    AuthService,
    RobberyService,
    Geolocation,
    GoogleMaps,
    ToastController,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
