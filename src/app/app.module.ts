import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddBikePage} from '../pages/add-bike/add-bike';
import { AddRobberyPage } from '../pages/add-robbery/add-robbery';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AlertWindowPage } from '../pages/alert-window/alert-window';


// messages Toast
import { ToastController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Importación de los servicios
import { AuthService } from '../service/auth.service';
import { BikeService } from '../service/bikes.service';
import { RobberyService } from '../service/robbery.service';
import { MessageService } from '../service/message.service';

// Firestore Import
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { firebaseConfig } from './credentials';
// GoogleMaps
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddRobberyPage,
    AddBikePage,
    LoginPage,
    SignupPage,
    AlertWindowPage  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ComponentsModule,
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
    SignupPage,
    AlertWindowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFirestore,
    BikeService,
    AuthService,
    RobberyService,
    MessageService,
    Geolocation,
    GoogleMaps,
    GooglePlus,
    ToastController,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
