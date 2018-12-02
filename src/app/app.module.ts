import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddRobberyPage } from '../pages/add-robbery/add-robbery';
import { ToastController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Importación de los servicios
import { LoginService } from '../service/login.service';
import { BikeService } from '../service/bikes.service';
import { RobberyService } from '../service/robbery.service';

// Firestore Import
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from './credentials';
// GoogleMaps
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddRobberyPage
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
    AddRobberyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestore,
    BikeService,
    LoginService,
    RobberyService,
    Geolocation,
    GoogleMaps,
    ToastController,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
