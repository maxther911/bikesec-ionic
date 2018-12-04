import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Bike } from '../models/bike';
import { AuthService } from './auth.service';

@Injectable()
export class BikeService {
  private bikesCollection: AngularFirestoreCollection<Bike>;
  bikes: Observable<Bike[]>;
  bikesUsers: Observable<Bike[]>;
  private bike: Bike = {
    uid: '',
    nickName: '',
    id: '',
    marca: '',
    modelo: '',
    serial: '',
    color: '',
    rin: '',
    tipo: '',
    talla: '',
    description: '',
    image: ''
  };

  bikesUser: any;
  bikeDoc: AngularFirestoreDocument<Bike>;

  constructor(public afs: AngularFirestore, public auth: AuthService) {
    this.bikesCollection = this.afs.collection('bikes');
    this.bikes = this.bikesCollection.valueChanges();
  }

  getBikes() {
    return this.bikes;
  }

  getBikesByUID() {
    this.auth.user.subscribe (user => {
      console.log(user)
      this.bike.uid = user.uid
    })
    this.bikesCollection = this.afs.collection('bikes', ref => ref.where('uid', '==', this.bike.uid))
    this.bikesUser = this.bikesCollection.valueChanges()
    return this.bikesUser;
  }

  getBikesByUsers() {
    this.auth.user.subscribe (user => {
      this.bike.nickName = user.email.split('@')[0];
    })
   
    this.bikesUser = this.afs.doc(`bikes/${this.bike.nickName}`);
    return this.bikesUser;
  }

  getBikesByUsersLike(user : string) {
    this.bikesCollection = this.afs.collection('bikes', ref => ref.where('nickName', '==', user))
    this.bikesUser = this.bikesCollection.valueChanges()
    return this.bikesUser;
  }

  getBikeBySerial(serial : string) {
    this.bikesCollection = this.afs.collection('bikes', ref => ref.where('serial', '==', serial))
    this.bikesUser = this.bikesCollection.valueChanges()
    return this.bikesUser;
  }

  addBike(bike: Bike) {
    this.bikesCollection.add(bike);
  }

  deleteBike(bike: Bike) {
    this.bikeDoc = this.afs.doc(`bikes/${bike.id}`);
    this.bikeDoc.delete();
  }

  updateBike(bike: Bike) {
    this.bikeDoc = this.afs.doc(`bikes/${bike.id}`);
    this.bikeDoc.update(bike);
  }
}